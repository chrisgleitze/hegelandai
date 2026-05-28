#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="hegelandai"
APP_PORT="${APP_PORT:-3002}"
APP_HOST="${APP_HOST:-127.0.0.1}"
SERVICE_NAME="${SERVICE_NAME:-hegelandai}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "==> Deploying ${APP_NAME} from ${ROOT_DIR}"

if [[ "${SKIP_GIT_PULL:-0}" != "1" ]]; then
  echo "==> Updating repository"
  git pull --ff-only
fi

echo "==> Installing dependencies"
npm ci

if [[ "${SKIP_LINT:-0}" != "1" ]]; then
  echo "==> Running lint"
  npm run lint
fi

echo "==> Building production bundle"
npm run build

if [[ "${SKIP_RESTART:-0}" != "1" ]]; then
  echo "==> Restarting ${SERVICE_NAME}.service"
  sudo systemctl restart "${SERVICE_NAME}.service"
fi

echo "==> Checking local health endpoint"
curl -fsS "http://${APP_HOST}:${APP_PORT}/api/health"
echo

echo "==> ${APP_NAME} deploy complete"
