#!/usr/bin/env bash
set -eu

curl http://localhost:3000/api/cats -H "X-Tenant-Id: $1"
