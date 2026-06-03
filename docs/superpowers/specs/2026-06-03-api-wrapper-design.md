# Front-end API Wrapper Design

**Date:** 2026-06-03
**Issue:** Define a Common Interface for Front-end API Requests

## Problem

Axios is imported and called directly in at least 8 places across the front-end (`store/index.js`, `CampaignCards.vue`, `CauseCarousel.vue`, `DonateMoney.vue`, `LetterLoad.vue`, `SearchReps.vue`, `SignName.vue`, `vue_logger.js`). There is no consistent error type, no shared base-URL logic, and no seam to mock in tests.

## Solution

Create `src/api/index.js` — a class-based wrapper following the existing `PaymentPresenter` / `PaymentPresenterError` pattern in `shared/presenters/payment-presenter.js`.

## API Module (`src/api/index.js`)

### `APIError`

Extends `Error`. Sets `this.name = 'APIError'` and optionally carries `this.status` (HTTP status code) for callers that need to branch on it.

```js
class APIError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}
```

### `API` class

Constructor accepts:
- `path` (string, required) — resource path, e.g. `'/campaigns'`
- `version` (string, optional) — API version segment, e.g. `'v1'`

Builds `baseUrl`: `/api/v1/campaigns` (with version) or `/api/campaigns` (without).

Exposes four methods mirroring HTTP verbs:
- `get(endpoint = '', params = {})` — appends endpoint to baseUrl, passes params as query string
- `post(endpoint = '', data = {})` — POST to baseUrl + endpoint
- `put(endpoint = '', data = {})` — PUT to baseUrl + endpoint
- `delete(endpoint = '')` — DELETE to baseUrl + endpoint

All methods:
1. `await` the axios call
2. Return `response.data` on success
3. Catch errors and rethrow as `APIError(error.message, error.response?.status)`

### Usage examples

```js
// Versioned resource
const letterTemplates = new API('/letter_templates', 'v1')
const rendered = await letterTemplates.post('/render', { mergeVariables, templateId })

// Unversioned resource
const representatives = new API('/representatives')
const reps = await representatives.get(`/${postalCode}`)
```

## Tests (`src/api/__tests__/api.test.js`)

Using Jest with `jest.mock('axios')`.

| Test | Assertion |
|------|-----------|
| URL construction with version | `baseUrl` equals `/api/v1/path` |
| URL construction without version | `baseUrl` equals `/api/path` |
| Successful GET returns `response.data` | resolved value equals mocked data |
| Successful POST returns `response.data` | resolved value equals mocked data |
| Axios error is rethrown as `APIError` | thrown instance is `APIError` |
| `APIError` carries HTTP status | `error.status` matches mocked response status |

## Refactoring Scope

Migrate as examples of the new pattern — not a wholesale migration:

1. **`src/store/index.js` `loadLetterTemplate` action** — uses `/api/v1/letter_templates/:id` (v1 route)
2. **`src/components/LetterLoad.vue` `renderLetter` method** — uses `/api/v1/letter_templates/render` (v1 route)

All other existing axios calls (SearchReps, DonateMoney, SignName, CampaignCards, CauseCarousel, vue_logger) are left for a follow-up migration issue.

## File Structure

```
src/
  api/
    index.js                  ← new
    __tests__/
      api.test.js             ← new
```
