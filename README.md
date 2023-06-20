# Smart Cart

Smart Cart helps people avoid over-buying groceries so that we reduce food waste.

## Project structure

- [domain](./domain)
  - Standalone domain model that is shared/used by all other subrepos.
  - Make sure this is built before running the other subrepos, see [README](./domain/README.md) for more info.
- [app](./app)
  - Project directory for PWA made with Vue3/TS/Tailwind
- [server](./server)
  - Project directory for API server built with NestJS/TS/PostgreSQL
- [docs](./docs)
  - Technical documentation version controlled together with code

## LICENSE / Author / Contributing

- [AGPL License](./LICENSE)

### By

- [JJ](https://github.com/Jaimeloeuf)
