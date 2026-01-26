# Submit Project[s]

Suppose that a user named `alice` wants to submit her projects to `XMUM`, then she should follow these steps.

## Fork and Clone

1. Navigate to [UniverStar Organization](https://github.com/universtar-org) and find your institution repository (for Alice: [XMUM repo](https://github.com/universtar-org/xmum)).
2. Fork it to your account.
3. Clone your fork:

```bash
git clone git@github.com:alice/xmum.git
cd xmum
```

4. Add upstream:

```bash
git remote add upstream <git-http-link>
```

For example,

```bash
git remote add upstream https://github.com/universtar-org/xmum.git
```

## Create a Branch

Create a new branch based on the upstream with the following command:

```bash
git fetch upstream
git switch --create project/alice upstream/main
```

> Replace the `alice` with your username.

## Add Your Project

1. Create a YAML file named after your username.

```text
data/projects/alice.yaml
```

2. Add your projects.

```yaml
- repo: "demo"
- repo: "foo"
- repo: "bar"
```

## Commit Changes

```bash
git add data/projects/alice.yaml
git commit -m "project: add alice/demo, alice/foo, alice/bar"
```

## Push and Create PR

```bash
git push -u origin project/alice
```

Go to GitHub and create a Pull Request titled `Add Projects`.

Wait for maintainers to review and merge.
