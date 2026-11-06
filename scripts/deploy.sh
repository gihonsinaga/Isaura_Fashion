#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
LOCK_FILE="${XDG_CACHE_HOME:-$HOME/.cache}/isaura-frontend-deploy.lock"

mkdir -p "$(dirname "$LOCK_FILE")"
exec 9>"$LOCK_FILE"
flock -n 9 || { echo "Another frontend deployment is running" >&2; exit 1; }

cd "$PROJECT_DIR"
git fetch --prune origin main
git merge-base --is-ancestor HEAD origin/main || { echo "Local branch diverged from origin/main" >&2; exit 1; }
git merge --ff-only origin/main

docker network inspect isaura-network >/dev/null 2>&1 || docker network create isaura-network
docker compose up -d --build

for _ in {1..40}; do
  if curl --fail --silent --max-time 5 http://127.0.0.1:8080/ >/dev/null; then
    echo "Isaura frontend deployment successful"
    exit 0
  fi
  sleep 3
done

docker compose logs --tail=100 frontend >&2 || true
echo "Frontend did not become healthy" >&2
exit 1
