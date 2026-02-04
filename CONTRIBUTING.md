# Contributing Guide

## Architecture Overview

```mermaid
graph TD
  main["universtar-org/universtar"]
  deploy["Deploy to GitHub Pages"]
  bind["Bind to Cooresponding Domain"]

  main -->|Reuse the main repository| xmum["universtar-org/xmum"] --> deploy
  main -->|Reuse the main repository| mit["universtar-org/mit"] --> deploy
  main -->|Reuse the main repository| dots[...] --> deploy
  deploy --> bind
```

## How it Works

This project is based on [`Hugo`](https://gohugo.io/), which supports adding themes. The main repository `universtar-org/universtar` serves as a theme, so that other repositories could reuse it.

There are some GitHub actions used to:

1. Fetch and update project data using [`universtar-org/updater`](https://github.com/universtar-org/updater), which calls [GitHub REST API](https://docs.github.com/rest).
2. Automatically upgrade the theme.
3. Deploy the site to GitHub Pages.

Overall, this project is serverless, costless, and highly automatic.

## Requirement

| Build Tool                                 | Version                        |
| ------------------------------------------ | ------------------------------ |
| [`Hugo`](https://gohugo.io/)               | `v0.153.3+extended+withdeploy` |
| [`Node.JS`](https://nodejs.org/)           | `v24.12.0`                     |
| [`Go`](https://go.dev/)                    | `1.25.5`                       |
| [`just`](https://just.systems/) (Optional) | `v1.46.0`                      |

## Set up Development Environment

0. Fork, clone and enter the repository

   Create a [fork](https://github.com/universtar-org/universtar/fork) on GitHub.

   Then,

   ```bash
   git clone git@github.com:universtar-org/universtar.git
   cd universtar/
   ```

   > Replace `universtar-org/universtar` with your forked repository.

1. Add Upstream

   ```bash
   git remote add upstream https://github.com/universtar-org/universtar.git
   git fetch upstream
   ```

2. Create a new branch (based on the `develop` branch)

   ```bash
   git switch --create new-branch-name upstream/develop
   ```

3. Install dependencies

   For NixOS users, run one of the following command to enter dev shell.

   ```bash
   direnv allow # With `direnv`
   nix develop # Without `direnv`
   ```

   For other uses, run this command to install dependencies via `npm`:

   ```bash
   npm install
   ```

4. Command list

   Preview the website:

   ```bash
   hugo server --config ./dev.yaml --disableFastRender
   # Or
   just dev
   ```

   Clean build caches:

   ```bash
   rm -rf public resources ./hugo_stats.json
   # Or
   just gc
   ```

   Format files:

   ```bash
   npx prettier -w "./**/*.html" "./**/*.md"
   # Or
   just format
   ```

   Update project data:

   ```bash
   curl -L -o updater https://github.com/universtar-org/tools/releases/latest/download/updater-linux-amd64
   chmod +x updater
   ./updater ./data/projects ; rm ./updater
   # Or
   just update
   ```

5. Commit changes

   The commit message should follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

6. Push changes

   ```bash
   git push -u origin your/branch
   ```

7. Open pull request

   All changes should be submitted to `develop` branch at first, so please remember to change the target branch in the pull request.
