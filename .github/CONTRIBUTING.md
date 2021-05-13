# Contributing

## For Developers

### Prerequisites

If you are using a MacOSX device, you can setup all of the prerequisites by running one convenient script:

```shell
script/bootstrap
```

#### Node.js & npm

Ensure a modern version of [Node.js (and npm)](https://nodejs.org/en/download/) are installed.

Currently used versions in production:
- Node.js @ `14.x`
- npm @ `6.x`

#### PostgreSQL server

Ensure a [PostgreSQL server is installed](https://www.postgresql.org/download/) and running.

Currently used version in production:
- PostgreSQL @ `13.x`

### Getting Started

1. Clone the repository.

2. Install the dependencies. From a terminal, navigate to the project's root directory and run:

```shell
npm install
```

3. Create the local PostgreSQL databases:

```shell
npm run db:create
```

4. Ensure you have [configured your environment](#configuration).

5. Run the tests to ensure everything is working as expected:

```shell
npm test
```

6. Start the server, either simply:

```shell
# Simple approach
npm start
```

  or with `nodemon` to automatically restart on changes:

```shell
# nodemon approach with automatic restarts
npm run dev
```

### Configuration

#### Using the Google Civic Information API locally

1. Using your preferred Google account, head to the [Google API Console's Credentials page](https://console.developers.google.com/apis/credentials) to create a new Project and API key. If you need a bit more guidance, refer to [Google's guide](https://developers.google.com/civic-information/docs/using_api).
2. Hit the following URL, substituting your own API key in:

```
https://www.googleapis.com/civicinfo/v2/elections?key=<YOUR_API_KEY>
```

  Chances are likely that you will receive a `403` response with an error message in the JSON response body explaining that you must enable the Google Civic Information API for your new Project. It will also provide a URL to visit to do just that (enable it), so please navigate to that. For reference, its format will be similar to:

```
https://console.developers.google.com/apis/api/civicinfo.googleapis.com/overview?project=<YOUR_PROJECT_ID>
```

3. On the resulting page, click the "Enable" button.
4. Revisit the URL from the earlier step, substituting your own API key in:

```
https://www.googleapis.com/civicinfo/v2/elections?key=<YOUR_API_KEY>
```

  This time around, you should succeed with a JSON response body containing an `elections` array.

5. Create a file called  `.env` in the project's root directory.
6. Add a new key-value pair to the file containing your new API key, e.g.

```
# API key for the Google Civic API
CivicAPI=<YOUR_API_KEY>
```

7. Save the changes to the `.env` file.
