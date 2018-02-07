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

## Usage

Add the dependency.

```
npm install @straw-hat/npm-packager --save-dev

# or

yarn add @straw-hat/npm-packager --dev
```

Configure your `package.json`. Probably the best option is to create some `scripts`
on your project.

```json
{
  "name": "my-awesome-project",
  "scripts": {
    "release": "npm-packager publish"
  },
  "directories": {
    "dist": "lib"
  }
}
```

Use `release` for deploying your package.

```
npm run release
```

## Must Read

The `pkg.main`, `pkg.types` or any other path on your `package.json` must be relative
to the `pkg.directories.dist` folder.

`npm-packager` doesn't do any build process, all what it does is use `pkg.directories.dist`
config and copy over the `./package.json` if there is no `package.json` already.

Because of this, if you need to do any build process probably is better to enhance
the `release` script.

Example,

**Babel**

```
"build": "babel src/** -d lib",
"release": "yarn build && npm-packager publish",
```

**Typescript**

```
"build": "tsc --outDir lib",
"release": "yarn build && npm-packager publish",
```
