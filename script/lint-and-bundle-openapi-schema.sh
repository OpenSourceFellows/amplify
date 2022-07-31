echo "Bundling OpenAPI schema from docs/api_docs"

redocly bundle docs/api_docs/openapi.yaml --output openapi.yml

echo "Linting OpenAPI schema"

redocly lint openapi.yml --extends=minimal --skip-rule=operation-operationId