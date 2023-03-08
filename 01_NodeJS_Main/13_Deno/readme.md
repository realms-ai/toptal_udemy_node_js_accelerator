# Deno

- [Site](https://deno.land/)

## How to run

```
  deno run src/01_basic.ts
  deno run --allow-write=test.txt src/01_basic.ts
  deno run --allow-net src/02_serve.ts
  deno run --reload 02_serve.ts   // Used to re-fetch the remote files
  DEBUG=* deno run --allow-net --allow-read --allow-sys --allow-env app.ts
```

## Deno libraries

![](./../images/deno_libraries.png)

## Experience

- Oak is not stable and causes a lot of issues
