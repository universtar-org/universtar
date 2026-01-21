# Submit Project[s]

Suppose that a user named `alice` wants to submit her project `demo` to `XMUM`, then she should follow these steps.

1. Firstly, navigate to the [UniverStar Organization](https://github.com/universtar-org) and find your institution repository. For Alice, she should navigate to [XMUM repository](https://github.com/universtar-org/xmum).
2. Then, fork the repository to your own account.
3. Clone the forked repository with `git clone <repo-link>`. For example, `git clone git@github.com:alice/xmum.git`.
4. Then, enter the folder.
5. Set the upstream using the following command:

```bash
git remote add upstream <git-http-link>
```

For example,

```bash
git remote add upstream https://github.com/universtar-org/xmum.git
```

6. Then create a new branch based on the upstream with the following command:

```bash
git switch --create project/<username> upstream
```

Replace the `<username>` with your username. For example,

```bash
git switch --create project/alice upstream
```

7. For those who have not submitted projects before, please create a `yaml` file with the same name as your username, for example, `alice.yaml` under `data/projects` folder. So the full path may look like `data/projects/alice.yaml`.
8. In the file, add information of your projects in this format:

```yaml
- repo: "demo"
  tags:
    - "Go"
    - "Machine Learning"
```

If you have multiple projects to add, you can simply append them with the same format, like:

```yaml
- repo: "demo"
  tags:
    - "Go"
    - "Machine Learning"
- repo: "foo"
  tags:
    - "Rust"
- repo: "bar"
  tags:
    - "AI"
    - "Website"
    - "Software"
```

Tags are optional, and if you want to add tags, please ensure the number of tags is not exceeding **5**.

9. Commit your changes properly.

The format of commit should be:

```gitcommit
project: add <username>/<repo>
```

For example,

```gitcommit
project: add alice/demo
```

If you have multiple repositories to submit, you should put them into one commit and separate them with comma, like:

```gitcommit
project: add alice/demo, alice/foo, alice/bar
```

10. Push your commits to the corresponding branch.

```bash
git push -u origin project/<username>
```

For example,

```bash
git push -u origin project/alice
```

11. Then, create a pull request on GitHub with title `Add Projects`.
12. Wait for maintainers to merge your PR.
