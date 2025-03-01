# ReactJS App Template

## Deploying a subfolder to GitHub Pages
### Step 1
Remove the dist directory from the project's .gitignore file.

### Step 2
Make sure git knows about your subtree (the subfolder with your site).
```
git add dist && git commit -m "Initial dist subtree commit"
```

### Step 3
Use subtree push to send it to the gh-pages branch on GitHub.

```
git subtree push --prefix dist origin gh-pages
```

## package.json - Scripts

```
{
  "homepage": "https://quickheaven.github.io/react-app-template",
  "name": "react",
  "version": "1.0.0",
  "scripts": {
    "start": "parcel ./src/index.html",
    "prebuild-dev": "shx rm -rf dist/*",
    "build-dev": "parcel ./src/index.html --no-optimize --public-url ./",
    "prebuild": "shx rm -rf dist/*",
    "build": "parcel ./src/index.html --public-url ./",
    "push-gh-pages": "push-dir --dir=dist --branch=gh-pages --cleanup --verbose"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "description": "",
  "dependencies": {
    "live-server": "^1.2.2",
    "parcel": "^2.7.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.26.9",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "gh-pages": "^6.3.0",
    "process": "^0.11.10",
    "push-dir": "^0.4.1",
    "shx": "^0.3.3"
  }
}
```
