# Syncano Socket for <name>

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-auth0/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-auth0/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-auth0/master.svg)](https://codecov.io/github/eyedea-io/syncano-socket-auth0/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/auth0.svg)](https://www.npmjs.com/package/@eyedea-sockets/auth0)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-auth0.svg)

Main Socket features:

* **auth0/verify** — user verify

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/auth0 --save
npx s deploy
```

Use it:

1. Create app in auth0 
2. Use auth0-js in your client
``` javascript
  const auth0Instance = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLINET_ID,
  })

  auth0Instance.authorize({
    scope: 'openid profile email read:patients read:admin',
    responseMode: 'query',
    responseType: 'code',
    redirect_uri: 'https://<instance name>.syncano.space/auth0/verify/',
  })
```
