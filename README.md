# Sport-fun

This is the UI for the parents to register their kids.

## Run locally

Run from "Run and debug" (NextJs: debug full stack)

## Pushing

- Go to /Users/dalaufer/.gitconfig and comment out these lines:

```
[url "https://ghp_<TOKEN>:x-oauth-basic@github.com"]
insteadOf = https://github.com
```

- Push from the terminal (not vsCode)
- Restore those lines (they're needed for the login in Paypal)

## Deploy

To deploy to production, just push to the "main" branch

Do not store the package-lock.json if you do `npm i` from PP. It will have the
PP registry (even when it shouldn't) and the deployment will fail.

## TypeScript Support

This project now supports TypeScript. To start using TypeScript:

1. Place your `.ts` or `.tsx` files in the `src` directory.
2. Run `npx tsc` to compile TypeScript files to JavaScript in the `dist`
   directory.

`card number CVV ID EXP DATE`
`4580111111111121 any 3 digits valid Israeli ID future date For successful clearings`
