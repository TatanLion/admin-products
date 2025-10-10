## Testing

To test our API, we will use Jest and Supertest.

Supertest is a library that allows us to test HTTP endpoints.

We must install the development dependencies:

```bash
npm install --save-dev jest supertest ts-jest @types/jest @types/supertest
```

Then, we can config Jest with the following command:

```bash
npx ts-jest config:init
```

Then, we can add the test script to `package.json`:

```json
{
  "scripts": {
    "test": "jest --detectOpenHandles --watch"
  }
}
```


## Documentation with Swagger

To document our API, we will use Swagger.

We must install the dependencies:

```bash
pnpm install  swagger-ui-express swagger-jsdoc
```

And use development dependencies:

```bash
pnpm install --save-dev @types/swagger-ui-express @types/swagger-jsdoc
```