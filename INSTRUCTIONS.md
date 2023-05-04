# Module 10 Assignment: Automated Testing

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Introduction

In this assignment, it will finally be YOUR turn to write some automated tests!

Writing tests is a skill that all developers are required to learn but few learn before entering the workforce. In this assignment, you'll fill in some missing tests for a Pokemon application.

&nbsp;
## Setup

Copy the starter files inside of `unsolved` into the root directory of your GitHub repository.

Ensure you include a `.gitignore` file in your repo that includes at minimum:

```
**/.DS_Store
**/node_modules/
.env
```

Run `npm i` in the root directory of your repository (your `package.json` should be in the root directory).

&nbsp;
## Instructions

The setup for the test suite has already been created for you, so there is no need to add any packages or create any test files. Also, the pokemon application is feature-complete and requires no additional code.

Navigate to the `test` folder and you will see three files:

1. `app.test.js` - This test suite covers the overall application using `supertest`. Each test will call a certain endpoint and test the results.
1. `convertUnits.test.js` - This test suites covers the two helper functions that convert hectograms and decimeters into American units of measurement. These unit tests should pass an input into each function and expect a certain output.
1. `pokemon.test.js` - This test suite covers the `getPokemon` function inside of `util/pokemon.js`, which makes an API call to the [PokeAPI](https://pokeapi.co/) to retrieve pokemon info. Each test will verify the output of the `getPokemon` function.

To complete the assignment you must finish implementing the tests outlined in all three files. Some of the tests are already completed, so use those tests as a guide for implementing the remaining tests.

**NOTE:** None of the test files will allow actual API calls to be made to the PokeAPI and instead stub or mock the API calls, returning fake data instead. The calls have already been mocked within the test files using the [SinonJS](https://sinonjs.org/) package.

&nbsp;
## App Behavior

This application allows users to search for Pokemon and displays some basic information about the pokemon.

To run the application locally, run:

```
npm start
```

You can then navigate to [http://localhost:3000](http://localhost:3000) to view the application.

&nbsp;
## Testing

This time, you'll be responsible for writing the automated tests! While some are already completed for you, you'll have to complete the remaining tests to receive full credit.

To run the tests once, run:

```
npm test
```

To run the tests in watch mode, run:

```
npm run test:watch
```

&nbsp;
## Requirements for full credit

To receive full credit for this assignment, you MUST:

  * Complete all of the automated tests outlined in the `/tests` folder.

&nbsp;
## Submission

When submitting this assignment, please include:

  * A link to the assignment's GitHub repository.
  * A screenshot of the automated test results.