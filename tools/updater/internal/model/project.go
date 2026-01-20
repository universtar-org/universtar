package model

// Tags are defined by users, and they don't need to be fetched.
// So `tags` is not necessary in this model.
type Project struct {
	Username    string `yaml:"username"`
	Repo        string `yaml:"repo"`
	Stars       int    `yaml:"stars"`
	Description string `yaml:"description"`
}
