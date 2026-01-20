dev:
  # Start the server.
  hugo server --buildDrafts --disableFastRender

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
