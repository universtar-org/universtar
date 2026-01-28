dev:
  # Start the server.
  hugo server --config ./dev.yaml --disableFastRender

gc:
  # Clean build cache.
  rm -rf public resources ./hugo_stats.json

format:
  # Format code.
  prettier -w "./**/*.html" "./**/*.md"

new path:
  # Create new content.
  hugo new content {{path}}

update:
  # Update data.
  cd ./tools/updater && \
  go run ./cmd/updater/main.go ../../data/projects || exit 1 ; \
  cd - > /dev/null

check:
  # Check YAML.
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
