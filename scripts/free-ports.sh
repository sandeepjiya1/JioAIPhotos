#!/usr/bin/env bash
# Free ports before Vite starts so a single fixed port is always used (strictPort).
set -u

kill_listeners_on_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti ":${port}" 2>/dev/null || true)"
  if [[ -z "${pids}" ]]; then
    return 0
  fi
  # lsof may print multiple PIDs (IPv4/IPv6); dedupe
  printf '%s\n' ${pids} | sort -u | while read -r pid; do
    [[ -z "${pid}" ]] && continue
    echo "free-ports: killing PID ${pid} on port ${port}"
    kill -9 "${pid}" 2>/dev/null || true
  done
}

mode="${1:-dev}"

if [[ "${mode}" == "preview" ]]; then
  kill_listeners_on_port 4173
else
  for port in $(seq 5173 5190); do
    kill_listeners_on_port "${port}"
  done
fi
