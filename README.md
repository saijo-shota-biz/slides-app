# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Second, migrate the database:
```sh
npm run deploy:database
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/

## Database
### initialize local database
```sh
npm run db:local:init
```
### migration
create migration
https://developers.cloudflare.com/workers/wrangler/commands/#migrations-create
```sh
wrangler d1 migrations create slides-app-db [migration-name]
```

migration list
https://developers.cloudflare.com/workers/wrangler/commands/#migrations-list
```sh
wrangler d1 migrations list slides-app-db --local
```

migration apply
https://developers.cloudflare.com/workers/wrangler/commands/#migrations-apply
```sh
wrangler d1 migrations apply slides-app-db --local
```
