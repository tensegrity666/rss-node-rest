### TASK 2 - EXPRESS REST SERVICE
- - -
### TASK 3 - LOGGING & ERROR HANDLING
# Results:
__`Tests:       17 passed, 17 total`__<br>

#### Logfiles you can find in `./logs`<br>
`error.log` contains errors with levels > 400 (all errors).

#### To enable errors, uncomment lines below 56 in app.js
- - -

### TASK 4 - MONGO DB
# Results:
__`Tests:       17 passed, 17 total`__<br>
_The information on DB connection (connection string) is stored in __.env__ file_
- - -

### TASK 5 - Authentication and JWT
# Results:
__`Tests:       32 passed, 32 total`__<br>
All tasks completed.

- - -
# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
