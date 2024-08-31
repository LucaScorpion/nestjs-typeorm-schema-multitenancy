#!/usr/bin/env node

const tenantIds = [1, 2, 3, 4, 5, 6];

function listCatsForTenant(tenantId) {
  return fetch('http://localhost:3000/api/cats', {
    headers: {
      'X-Tenant-Id': tenantId,
    },
  }).then((r) => r.json());
}

(await Promise.all(tenantIds.map((id) => listCatsForTenant(id)))).forEach(
  (c, i) => console.log(`${i + 1}: ${c.length} cats`),
);
