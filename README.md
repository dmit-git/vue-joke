# vue-jokester

> A Vue.js project for displaying and favorizing jokes from open source Chuck Norris API.
> https://api.chucknorris.io/
> Utilized vuejs, vuex, vuetify, vue-router, webpack, vue-loader, localforage, masonry-layout, material-design icons etc.

> Demo at https://vue-jokester.aldinezi.info/

## Dockerized setup

To build docker image run:

```bash
    docker build -t vue-jokester .
```

To serve hot-reload app from docker container run:

```bash
    docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 8080:8080 --name vue_jokester vue-jokester
```

To start container again use:

```bash
    docker start -i vue_jokester
```


## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```
