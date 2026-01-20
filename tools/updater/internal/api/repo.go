package api

type Repo struct {
	Description string `json:"description"`
	Stars       int    `json:"stargazers_count"`
}
