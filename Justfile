dev:
  # Start the server.
  hugo server --config ./dev.yaml --disableFastRender

gc:
  # Clean build cache.
  rm -rf public resources ./hugo_stats.json

format:
  # Format code.
  npx prettier -w "./**/*.html" "./**/*.md"

download-ust:
  # Download `ust`.
  curl -L -o ust https://github.com/universtar-org/ust/releases/latest/download/ust
  chmod +x ust

update:
  # Update data.
  just download-ust
  ./ust update ./data/projects ; rm ./ust

update-ci:
  # Update data (CI).
  just download-ust
  ./ust update --debug ./data/projects
  rm ./ust

check:
  # Check YAML.
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
  just download-ust
  ./ust check ./data/projects ; rm ./ust

check-ci:
  # Check YAML (CI).
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
  just download-ust
  ./ust check --debug ./data/projects
  rm ./ust

unique user:
  # Check duplicated user.
  just download-ust
  ./ust unique --debug {{ user }} ; rm ./ust
