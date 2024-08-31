#!/usr/bin/env bash
set -eu

curl -X POST http://localhost:3000/api/cats -H "X-Tenant-Id: $1"
