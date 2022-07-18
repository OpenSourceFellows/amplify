# amplify

## Getting Started

This repo contains both the frontend and backend portions of the Amplify application.

The frontend code is stored in the `src/` directory.

The backend (API) code is stored in the `server/` directory.



**Project Workflow:**

[Enablement Deck](https://docs.google.com/presentation/d/1llJgeTU1EzRSYB8kL-IQeAdoq7p6xb4ApEac5E3M8Qo/edit?usp=sharing)

<img width="792" alt="Screen Shot 2021-05-15 at 11 26 45 AM" src="https://user-images.githubusercontent.com/9143339/118374352-79d68a80-b570-11eb-9f21-703ce12a9638.png">

- [Overall Project Board](https://github.com/ProgramEquity/amplify/projects?type=beta)
- [Feature Breakdown](https://github.com/ProgramEquity/amplify/discussions/62)
- [OSS Architecture](https://github.com/ProgramEquity/amplify/discussions/61)
- [Wiki](https://github.com/ProgramEquity/amplify/wiki): API methods, Data Structures

**Resources:**
- We meet every: 
-  - [Tuesday from 2:00-3:00pm PT](https://calendar.google.com/event?action=TEMPLATE&tmeid=NWh1NzdqYmRncXJsbzVlMTVocXBkMXFkZ2JfMjAyMTExMjNUMjIwMDAwWiBjX2FpcHRzdTR0djNlZnRrbzEwZWNodDd2cmIwQGc&tmsrc=c_aiptsu4tv3eftko10echt7vrb0%40group.calendar.google.com&scp=ALL) to pair program
  - [Thursday from 2:00-2:30pm PT](https://calendar.google.com/event?action=TEMPLATE&tmeid=dDBvbWYxNDcyMjgyZ3E5M2FqcWU4aWExYWNfMjAyMTExMThUMjIwMDAwWiBjX2FpcHRzdTR0djNlZnRrbzEwZWNodDd2cmIwQGc&tmsrc=c_aiptsu4tv3eftko10echt7vrb0%40group.calendar.google.com&scp=ALL) for [product standup](https://github.com/ProgramEquity/amplify/discussions/63)
  - Sign up for an [orientation](https://forms.gle/4miQJ8ccuWdeJha16)


## Project setup

https://user-images.githubusercontent.com/9143339/159093687-6fc90733-0599-445c-b08b-a6378d988e4b.mov

Would you like to become a contributor? Please check out our [contributors guide](.github/CONTRIBUTING.md)! 💝

```shell
script/bootstrap
```
You will need to copy the `.env.example` file to a `.env` file in this repo.

### Compiles and hot-reloads full app for development
```shell
npm run dev
```

### Compiles and minifies for production
```shell
npm run build
```

### Lints and fixes files
```shell
npm run lint
```

### Build and run as if in prod
```shell
npm start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## App Walkthrough

**App Structure**

Current Structure:

<img width="772" alt="Screen Shot 2022-01-26 at 1 31 37 PM" src="https://user-images.githubusercontent.com/9143339/153340605-dd7fd6e6-a5f3-466f-95e2-d941f8c0c2ee.png">

Goal Structure:

<img width="739" alt="Screen Shot 2022-01-26 at 1 31 28 PM" src="https://user-images.githubusercontent.com/9143339/153340595-f749e711-2e42-4069-aad6-3e949efda7d9.png">


**User Journey:**

https://user-images.githubusercontent.com/9143339/159093855-c01e1d77-0d6a-4f6e-b691-81491830001a.mp4


<img width="1561" alt="Screen Shot 2021-11-11 at 1 51 44 PM" src="https://user-images.githubusercontent.com/9143339/141374196-a32d140f-885c-4e45-8bba-99696f81ee80.png">


Try out our [demo](https://www.figma.com/file/46c9cmuTiCpFA4DHB8OK0H/Amplify-User-Interface-%2B-Design-Guide?node-id=1585%3A653) or review [App Research](https://www.notion.so/programequity/Dare-to-Dream-Civic-Engagement-is-key-to-change-595ca4db3a2948c6b44569b58d530c8c)

## Documenting the API with OpenAPI Schema and Swagger UI

Our API is documented using the [OpenAPI 3.1.0 Specification](https://spec.openapis.org/oas/v3.1.0), using a [multi-file structure](https://redocly.com/docs/resources/multi-file-definitions/).  Linting is enforced by [Redocly](https://redocly.com/docs/cli/); you might find it useful to use the [Redocly OpenAPI VSCode extension](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code) if you are iterating on the schema. See also [here](https://redocly.com/docs/openapi-visual-reference/) for a visual specification reference.

### Schema Specification Updates

Updates to the schema itself should be made in the appropriate subsection `.yaml` file in the `docs/bundled_api_docs/` directory. Try not to update the top level `openapi.yml` file; when our automated workflow runs, it will combine all of the files in the `docs/bundled_api_docs/` into the root-level `openapi.yml` file. See [here](https://redocly.com/docs/openapi-visual-reference/) for more about the file structure.

Make sure to lint and bundle the API schema locally by running `script/lint-and-bundle-openapi-schema.sh`.  Commit any changes to `openapi.yml` generated from this command.

### UI Generation

We use a [workflow action](tbd) to generate a [Swagger UI](https://swagger.io/tools/swagger-ui/) based on the API schema that exists in the `openapi.yml` file in the root directory.

The UI spec is viewable [here](tbd)
