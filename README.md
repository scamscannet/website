# ScamScan

Website and tools (website check, whois query, domain zones) for scamscan.net, built with Next.js as a static export.

## Development

Requires Node 20+.

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
npm run lint    # type check
```

API endpoints are configured via `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WHOIS_URL` (see `.env.example`).

## Structure

```
app/(landing)/   marketing pages: home, blog, about us (shared header + footer layout)
app/app/         tool pages under /app: website check, takedown tracker, tools (shared sidebar layout)
components/      shared UI; icons.tsx holds all icons
lib/             api.ts (requests), types.ts, hooks.ts, validation.ts, blog.ts and mocks.ts (placeholder data)
docs/            corporate identity
```

Tool pages take their input from the URL hash, e.g. `/app/check#example.com`.

The API has no IP whois, domain zone or node endpoints, so `lib/api.ts` simulates them with `lib/mocks.ts`. Run `npm run api` after API changes to regenerate `lib/schema.d.ts`.

Domain whois uses [who-dat](https://whois.backend.scamscan.net/docs).

## Deploy

```sh
docker build -t scamscan .
docker run -p 8080:80 scamscan
```

The image builds the static export and serves it with nginx.
