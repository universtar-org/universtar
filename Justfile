dev:
  # Start the server.
  hugo server --config ./dev.yaml --disableFastRender

gc:
  # Clean build cache.
  rm -rf public resources ./hugo_stats.json

format:
  # Format code.
  npx prettier -w "./**/*.html" "./**/*.md"

update:
  # Update data.
  go install github.com/universtar-org/tools/cmd/updater@latest
  $(go env GOPATH)/bin/updater ./data/projects

check:
  # Check YAML.
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
  go install github.com/universtar-org/tools/cmd/checker@latest
  $(go env GOPATH)/bin/checker ./data/projects
