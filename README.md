
# kblm-e2e-test-repo

This repository is used for [Kornblume](https://windbow27.github.io/Kornblume/) e2e tests.

## Getting Started

To clone the repository:
```bash
git clone git@github.com:frantw/kblm-e2e-test-repo.git
```

For optimal performance, it is recommended to use Node.js version 18 or higher to install dependencies.
```bash
cd kblm-e2e-test-repo
npm install
npx playwright install
```
## How to test

Run the tests using the following command:
```bash
npx playwright test
```

You could also run a single test with the title
```bash
npx playwright test -g "Should correctly read iPhone screenshot"
```

## Development

There's debug mode with [Playwright Inspector](https://playwright.dev/docs/debug)
```bash
npx playwright test -g "Should correctly read iPhone screenshot" --debug
```

You could add a specific breakpoint by [page.pause()](https://playwright.dev/docs/api/class-page#page-pause) method to your test:
```js
await page.pause();
```
![](https://user-images.githubusercontent.com/13063165/219473050-122be4c2-31d0-4cbd-aa8b-8588e8b781a6.png)