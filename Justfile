dev:
  # Start the server.
  hugo server --buildDrafts --disableFastRender

format:
  # Format code.
  prettier -w "./**/*.html" "./**/*.md"

new path:
  # Create new content.
  hugo new content {{path}}
