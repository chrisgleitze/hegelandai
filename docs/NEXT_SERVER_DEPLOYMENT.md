# Next.js server deployment — Hegel and AI

This repository is prepared to run as a production Next.js server behind Nginx and Cloudflare Tunnel.

## Runtime layout

```text
Cloudflare Tunnel
  -> Nginx on 127.0.0.1:8080
  -> Next.js on 127.0.0.1:3002
```

The Next.js process must never be exposed directly to the public internet.

## VPS paths

Recommended paths on the VPS:

```text
/srv/www/hegelandai                 # git checkout
/etc/systemd/system/hegelandai.service
/etc/nginx/sites-available/hegelandai.conf
/etc/nginx/sites-enabled/hegelandai.conf
/etc/hegelandai.env                 # optional, not committed
```

## Initial install on VPS

Run as `deploy` after Node 22/nvm and GitHub deploy keys are configured:

```bash
git clone git@github.com:chrisgleitze/hegelandai.git /srv/www/hegelandai
cd /srv/www/hegelandai
npm ci
npm run lint
npm run build
```

Install systemd and Nginx config:

```bash
sudo cp deploy/systemd/hegelandai.service /etc/systemd/system/hegelandai.service
sudo cp deploy/nginx/hegelandai.conf /etc/nginx/sites-available/hegelandai.conf
sudo ln -sfn /etc/nginx/sites-available/hegelandai.conf /etc/nginx/sites-enabled/hegelandai.conf
sudo nginx -t
sudo systemctl daemon-reload
sudo systemctl enable --now hegelandai.service
sudo systemctl reload nginx
```

Health checks:

```bash
curl -fsS http://127.0.0.1:3002/api/health
curl -fsSI -H 'Host: hegelandai.com' http://127.0.0.1:8080/
```

## Cloudflare Tunnel fragment

Add the entries from `deploy/cloudflared/hegelandai-ingress.yml` to the shared `/etc/cloudflared/config.yml` on the VPS.

## Update deployment

After pushing changes to GitHub, run on the VPS:

```bash
cd /srv/www/hegelandai
./scripts/deploy-production.sh
```

Optional smoke test:

```bash
./scripts/smoke-production.sh
CHECK_LIVE=1 ./scripts/smoke-production.sh
```

## Security notes

- The service binds to `127.0.0.1:3002` only via `npm run start:prod`.
- Nginx listens on `127.0.0.1:8080`; Cloudflare Tunnel connects to Nginx locally.
- `/api/health` is intentionally available for local and external monitoring.
- `/api/literature` is a development-only hot-reload endpoint and returns 404 in production.
- Keep secrets out of the repository. Use `/etc/hegelandai.env` for production-only values.
