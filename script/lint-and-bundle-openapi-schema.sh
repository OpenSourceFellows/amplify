echo "Bundling OpenAPI schema from docs/bundled_api_docs"

redocly bundle docs/bundled_api_docs/openapi.yaml --output openapi.yml

echo "Linting OpenAPI schema"

redocly lint openapi.yml --extends=minimal --skip-rule=operation-operationId