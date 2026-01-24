package updater

import (
	"context"
	"path/filepath"
	"strings"

	"github.com/universtar-org/universtar-updater/internal/api"
	"github.com/universtar-org/universtar-updater/internal/io"
)

// Update a file/user.
func Update(client *api.Client, ctx context.Context, path string) error {
	base := filepath.Base(path)
	owner := strings.TrimSuffix(base, filepath.Ext(base))

	projects, err := io.ReadYaml(path)
	if err != nil {
		return err
	}

	for i := range projects {
		repo, err := client.GetRepo(ctx, owner, projects[i].Repo)
		if err != nil {
			return err
		}
		projects[i].Description = repo.Description
		projects[i].Stars = repo.Stars
		projects[i].Tags = repo.Tags
	}

	io.WriteYaml(projects, path)

	return nil
}
