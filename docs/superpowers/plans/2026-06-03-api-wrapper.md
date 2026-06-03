# Front-end API Wrapper Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `src/api/index.js` — a class-based axios wrapper with a custom `APIError`, following the existing `PaymentPresenter` pattern — and migrate the two v1 routes as working examples.

**Architecture:** An `API` class takes a resource path and optional version string, builds a base URL, and exposes `get/post/put/delete` methods that return `response.data` on success and throw `APIError` on failure. Two existing call sites (`store/index.js:loadLetterTemplate` and `LetterLoad.vue:renderLetter`) are refactored to use the new class.

**Tech Stack:** Vue 2, Vuex 3, axios 0.27, Jest 28, Babel (`@vue/cli-plugin-babel/preset`)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/api/index.js` | Create | `APIError` class + `API` class |
| `src/api/__tests__/api.test.js` | Create | Unit tests (Jest, mocked axios) |
| `src/store/index.js` | Modify (lines 1, 123–139) | Replace axios with `API` in `loadLetterTemplate` |
| `src/components/LetterLoad.vue` | Modify (lines 53, 132–137) | Replace axios with `API` in `renderLetter` |

---

## Task 1: Bootstrap the test file and watch it fail

**Files:**
- Create: `src/api/__tests__/api.test.js`

- [ ] **Step 1: Create the test directory and file**

```bash
mkdir -p src/api/__tests__
```

- [ ] **Step 2: Write the test file**

Save to `src/api/__tests__/api.test.js`:

```js
import axios from 'axios'
import { API, APIError } from '../index'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

describe('API — URL construction', () => {
  test('builds base URL with version', () => {
    const api = new API('/campaigns', 'v1')
    expect(api.baseUrl).toBe('/api/v1/campaigns')
  })

  test('builds base URL without version', () => {
    const api = new API('/representatives')
    expect(api.baseUrl).toBe('/api/representatives')
  })
})

describe('API — get()', () => {
  test('returns response.data on success', async () => {
    const mockData = { id: 1, name: 'test' }
    axios.get.mockResolvedValue({ data: mockData })

    const api = new API('/campaigns')
    const result = await api.get()
    expect(result).toEqual(mockData)
  })

  test('throws APIError on failure', async () => {
    axios.get.mockRejectedValue({ message: 'Not found', response: { status: 404 } })

    const api = new API('/campaigns')
    await expect(api.get()).rejects.toThrow(APIError)
  })

  test('APIError carries HTTP status', async () => {
    axios.get.mockRejectedValue({ message: 'Not found', response: { status: 404 } })

    const api = new API('/campaigns')
    await expect(api.get()).rejects.toMatchObject({ status: 404 })
  })
})

describe('API — post()', () => {
  test('returns response.data on success', async () => {
    const mockData = { letter: '<p>Hello</p>' }
    axios.post.mockResolvedValue({ data: mockData })

    const api = new API('/letter_templates', 'v1')
    const result = await api.post('/render', { templateId: 1 })
    expect(result).toEqual(mockData)
  })

  test('throws APIError on failure', async () => {
    axios.post.mockRejectedValue({ message: 'Server error', response: { status: 500 } })

    const api = new API('/letter_templates', 'v1')
    await expect(api.post('/render', {})).rejects.toThrow(APIError)
  })
})
```

- [ ] **Step 3: Run tests — confirm they fail with "Cannot find module '../index'"**

```bash
npx jest src/api/__tests__/api.test.js --no-coverage
```

Expected output contains: `Cannot find module '../index'`

---

## Task 2: Implement `src/api/index.js`

**Files:**
- Create: `src/api/index.js`

- [ ] **Step 1: Create the file**

Save to `src/api/index.js`:

```js
import axios from 'axios'

export class APIError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}

export class API {
  constructor(path, version) {
    this.baseUrl = version ? `/api/${version}${path}` : `/api${path}`
  }

  async get(endpoint = '', params = {}) {
    try {
      const res = await axios.get(this.baseUrl + endpoint, { params })
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }

  async post(endpoint = '', data = {}) {
    try {
      const res = await axios.post(this.baseUrl + endpoint, data)
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }

  async put(endpoint = '', data = {}) {
    try {
      const res = await axios.put(this.baseUrl + endpoint, data)
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }

  async delete(endpoint = '') {
    try {
      const res = await axios.delete(this.baseUrl + endpoint)
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }
}
```

- [ ] **Step 2: Run tests — confirm all pass**

```bash
npx jest src/api/__tests__/api.test.js --no-coverage
```

Expected output: `Tests: 7 passed, 7 total`

- [ ] **Step 3: Commit**

```bash
git add src/api/index.js src/api/__tests__/api.test.js
git commit -m "feat: add API wrapper class and APIError"
```

---

## Task 3: Refactor `loadLetterTemplate` in `src/store/index.js`

**Files:**
- Modify: `src/store/index.js`

The current action (lines 123–139) calls `axios.get` directly and uses the full URL string:

```js
// CURRENT — remove this
import axios from 'axios'
...
async loadLetterTemplate({ state, commit }) {
  const templateUrl = `/api/v1/letter_templates/${state.campaign.letterTemplateId}`
  try {
    const res = await axios.get(templateUrl)
    const { letterTemplate } = res.data
    console.log(letterTemplate)
    commit('setGenericValue', { key: 'letterTemplate', value: letterTemplate })
  } catch (e) {
    alert(e)
  }
}
```

- [ ] **Step 1: Add the API import at line 1 of `src/store/index.js`**

Replace:
```js
import axios from 'axios'
```
With:
```js
import { API } from '@/api'
```

- [ ] **Step 2: Replace `loadLetterTemplate` action (lines 123–139)**

Replace:
```js
    async loadLetterTemplate({ state, commit }) {
      const templateUrl = `/api/v1/letter_templates/${state.campaign.letterTemplateId}`

      try {
        const res = await axios.get(templateUrl)

        const { letterTemplate } = res.data
        console.log(letterTemplate)

        commit('setGenericValue', {
          key: 'letterTemplate',
          value: letterTemplate
        })
      } catch (e) {
        alert(e)
      }
    }
```

With:
```js
    async loadLetterTemplate({ state, commit }) {
      const letterTemplatesApi = new API('/letter_templates', 'v1')

      try {
        const data = await letterTemplatesApi.get(`/${state.campaign.letterTemplateId}`)

        commit('setGenericValue', {
          key: 'letterTemplate',
          value: data.letterTemplate
        })
      } catch (e) {
        alert(e.message)
      }
    }
```

- [ ] **Step 3: Run the full test suite to confirm nothing broke**

```bash
npx jest --no-coverage
```

Expected: all previously passing tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/store/index.js
git commit -m "refactor: use API wrapper in loadLetterTemplate store action"
```

---

## Task 4: Refactor `renderLetter` in `src/components/LetterLoad.vue`

**Files:**
- Modify: `src/components/LetterLoad.vue`

The current method (lines 53, 132–137) imports axios directly:

```js
// CURRENT — to be replaced
import axios from 'axios'
...
renderLetter() {
  axios.post('/api/v1/letter_templates/render', { mergeVariables: { ...this.userSelections, representativeName: this.selectedRep.name, firstName: '<Your name here>', lastName: '' }, templateId: this.letterTemplate.id })
    .then((res) => {
      this.letterBody = res.data.letter
    })
}
```

- [ ] **Step 1: Replace the `axios` import in the `<script>` block**

Replace:
```js
import axios from 'axios'
```
With:
```js
import { API } from '@/api'
```

- [ ] **Step 2: Replace the `renderLetter` method**

Replace:
```js
    renderLetter() {
      axios.post('/api/v1/letter_templates/render', { mergeVariables: { ...this.userSelections, representativeName: this.selectedRep.name, firstName: '<Your name here>', lastName: '' }, templateId: this.letterTemplate.id })
        .then((res) => {
          this.letterBody = res.data.letter
        })
    }
```

With:
```js
    async renderLetter() {
      const letterTemplatesApi = new API('/letter_templates', 'v1')
      const data = await letterTemplatesApi.post('/render', {
        mergeVariables: {
          ...this.userSelections,
          representativeName: this.selectedRep.name,
          firstName: '<Your name here>',
          lastName: ''
        },
        templateId: this.letterTemplate.id
      })
      this.letterBody = data.letter
    }
```

- [ ] **Step 3: Run the full test suite**

```bash
npx jest --no-coverage
```

Expected: all previously passing tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/LetterLoad.vue
git commit -m "refactor: use API wrapper in LetterLoad renderLetter"
```
