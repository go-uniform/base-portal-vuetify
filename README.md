# Base Portal Vuetify
Quickly and easily prototype a new administration portal for your project.

## Project setup
```
npm install
```
**Note:** In build scripts, for pipelines or github-workflows, remember to use the `npm ci` instead since it will not try to upgrade any old packages eliminating any unexpected bugs from upgrading external node packages.

## Configure local environment
You can just use our default local development environment configuration just to get started.
```
cp .env.development.local.example .env.development.local
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Dependencies

Vuetify 2.x
vuetify-confirm-box (npm package)
