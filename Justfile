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
  curl -L -o updater https://github.com/universtar-org/tools/releases/latest/download/updater-linux-amd64
  chmod +x updater
  ./updater ./data/projects ; rm ./updater

update-ci:
  # Update data (CI).
  curl -L -o updater https://github.com/universtar-org/tools/releases/latest/download/updater-linux-amd64
  chmod +x updater
  ./updater -v ./data/projects
  rm ./updater

check:
  # Check YAML.
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
  curl -L -o checker https://github.com/universtar-org/tools/releases/latest/download/checker-linux-amd64
  chmod +x checker
  ./checker ./data/projects ; rm ./checker

check-ci:
  # Check YAML (CI).
  find ./data/projects -type f \( -name '*.yml' -o -name '*.yaml' \) -exec yq '.' {} \;
  curl -L -o checker https://github.com/universtar-org/tools/releases/latest/download/checker-linux-amd64
  chmod +x checker
  ./checker -v ./data/projects
  rm ./checker

unique user:
  # Check duplicated user.
  curl -L -o unique https://github.com/universtar-org/tools/releases/latest/download/unique-linux-amd64
  chmod +x unique
  ./unique -v {{ user }} ; rm ./unique
