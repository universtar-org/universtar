dev:
  # Start the server.
  hugo server --buildDrafts --disableFastRender --config dev.yaml

gc:
  # Clean build cache.
  rm -rf public resources

format:
  # Format code.
  prettier -w "./**/*.html" "./**/*.md"

new path:
  # Create new content.
  hugo new content {{path}}

update:
  # Update data.
  cd ./tools/updater && \
  go run ./cmd/updater/main.go ../../data/projects ; \
  cd - > /dev/null

check:
  # Check YAML.
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
