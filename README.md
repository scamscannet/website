# ScamScan

Website and tools (scam check, whois query, domain zones) for scamscan.net, built with Next.js as a static export.

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
app/(app)/       tool pages: scam check, whois query, domain zone (shared sidebar layout)
components/      shared UI; icons.tsx holds all icons
lib/             api.ts (requests), types.ts, hooks.ts, validation.ts, blog.ts (placeholder content)
docs/            corporate identity
```

Tool pages take their input from the URL hash, e.g. `/scam-check#example.com`.

## Deploy

```sh
docker build -t scamscan .
docker run -p 8080:80 scamscan
```

The image builds the static export and serves it with nginx.
