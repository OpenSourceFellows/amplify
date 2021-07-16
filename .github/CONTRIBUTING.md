# Contributing

## For Developers

### Prerequisites

If you are using a MacOS or Linux system, you can setup all of the prerequisites by running one convenient script:

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

2. If you are using a MacOS or Linux system, you can setup all of the prerequisites by running one convenient script:

```shell
script/bootstrap
```

  If you can successfully run that script, you may skip ahead to Step 5.

3. Install the dependencies. From a terminal, navigate to the project's root directory and run:

```shell
npm install
```

  ℹ️ This should should not be necessary if you successfully ran `script/bootstrap`.

4. Create and seed the local PostgreSQL databases:

```shell
npm run db:create
```
   followed by
```shell
npm run db:seed
```

  ℹ️ This should should not be necessary if you successfully ran `script/bootstrap`.

5. Ensure you have [configured your environment](#configuration).

6. Run the tests to ensure everything is working as expected:

```shell
npm test
```

7. Start the server, either simply:

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

5. Create a file called  `.env` in the project's root directory, preferrably using the `.env.example` file as your template.
6. Add a new key-value pair to the file containing your new API key, e.g.

```
# API key for the Google Civic API
CIVIC_API_KEY=<YOUR_API_KEY>
```

7. Save the changes to the `.env` file.

#### Using the Lob API locally

1. Login to your personal [Heroku dashboard](https://dashboard.heroku.com/).
2. Switch to the `programequity` team under the project dropdown (which probably defaulted to `Personal`).
  - :information_source: If you do not see that team, you probably need to be added by a project administrator.
3. Go into the backend application, currently named `murmuring-headland-63935`.
4. Go into the "Settings" tab.
5. In the "Config Vars" section, click the "Reveal Config Vars" button to expand the list of existing environment variables.
6. Find the `LOB_API_KEY` and `TEST_LOB_API_KEY` variables.
7. Create a file called  `.env` in the project's root directory, preferrably using the `.env.example` file as your template.
8. Add a set of new key-value pairs to the file containing the API keys with the values from the Heroku application, e.g.

```
# Production environment API key for the Lob API
LOB_API_KEY=<HEROKU_VARIABLE>

# Test environment API key for the Lob API
# This is only required for running the integration tests successfully!
TEST_LOB_API_KEY=<HEROKU_VARIABLE>
```

9. Save the changes to the `.env` file.


#### Ignoring the Auth0 authentication locally

Although the authentication check is not required locally, the module in use still expects certain values to be passed in regardless of their validity.

1. Create a file called  `.env` in the project's root directory, preferrably using the `.env.example` file as your template.
2. Add set of a new key-value pairs to the file with literal nonsense values, e.g.

```
SERVER_PORT=6060
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_AUDIENCE=your_Auth0_identifier_value
AUTH0_DOMAIN=your_Auth0_domain
```

3. Save the changes to the `.env` file.


#### Setting up Auth0 authentication locally

1. Follow above steps for configuring .env file.
2. Sign up for an account at [Auth0](https://auth0.com/).
3. Select `personal` when prompted with the type of account being created.
4. Go to [API dashboard](https://manage.auth0.com/#/apis) and click `Create API` button.
5. Add a Name to your API. It can be named anything you'd like.
6. Set its Identifier value. `http://localhost:5000/` is recommended. For more information see this [guide](https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Calling-an-API)
7. Click on the "Test" tab.
8. Locate the section called " Asking Auth0 for tokens from my application".
9. Click on the cURL tab to show a mock POST request.
10. Copy your Auth0 domain, which is part of the --url parameter value: tenant-name.region.auth0.com.
11. Paste the Auth0 domain value as the value of `AUTH0_DOMAIN` in .env.

#### Connecting to the production PostgreSQL database locally

:warning: _For trusted collaborators ONLY!_ :warning:

1. Using your authorized Heroku account, you can find the `DATABASE_URL` [Config Var](https://devcenter.heroku.com/articles/config-vars) on our deployed Heroku app's "Settings" page.

2. Create a file called `.env` in the project's root directory, preferrably using the `.env.example` file as your template.
3. Add a new key-value pair to the file containing the Heroku `DATABASE_URL` value, e.g.

```
# PostgreSQL database connection string for production
DATABASE_URL=<OUR_HEROKU_DATABASE_URL>
```

4. Save the changes to the `.env` file.
5. When starting your local server, you must set your `NODE_ENV` environment variable to `"production"` in order for `knex` to connect to this Heroku production database, e.g.

```shell
NODE_ENV=production npm start
```
