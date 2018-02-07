# npm-packager

Enhance npm `publish` and `pack` commands using `pkg.directories.dist` config
for publishing or packaging the project.

If `pkg.directories.dist` is present, it will use it for create the package,
if not, then it will use the root of the project.

```json
{
  "name": "my-awesome-project",
  "directories": {
    "dist": "dist"
  }
}
```
