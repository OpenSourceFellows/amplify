# Contributing

## For Developers

### Getting Started

1. Clone the repository
2. Install the dependencies. From a terminal, navigate to the project's root directory and run:

```shell
npm install
```

3. Run the tests to ensure everything is working as expected:

```shell
npm test
```

4. Start the server, either simply:

```shell
# Simple approach
npm start
```

  or with `nodemon` to automatically restart on changes:

```shell
# nodemon approach with automatic restarts
npm run dev
```

### Using the Google Civic Information API locally

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
CIVIC_API_KEY=<YOUR_API_KEY>
```

7. Save the changes to the `.env` file.
