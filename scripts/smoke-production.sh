#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="hegelandai"
APP_DOMAIN="${APP_DOMAIN:-hegelandai.com}"
APP_PORT="${APP_PORT:-3002}"
NGINX_HOST="${NGINX_HOST:-127.0.0.1}"
NGINX_PORT="${NGINX_PORT:-8080}"

check() {
  echo "==> $*"
  "$@"
}

check curl -fsS "http://127.0.0.1:${APP_PORT}/api/health"
echo
check curl -fsSI -H "Host: ${APP_DOMAIN}" "http://${NGINX_HOST}:${NGINX_PORT}/"

if [[ "${CHECK_LIVE:-0}" == "1" ]]; then
  check curl -fsSI "https://${APP_DOMAIN}/"
fi

echo "==> ${APP_NAME} smoke test complete"
