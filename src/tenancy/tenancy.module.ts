import { AutoloadModule } from 'nestjs-autoloader';
import { Global, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getTenantDataSource } from './tenant.data-source';
import { TENANT_DATA_SOURCE } from './tenant-data-source.decorator';
import { Request } from 'express';

@Global()
@AutoloadModule(__dirname, {
  providers: [
    {
      provide: TENANT_DATA_SOURCE,
      scope: Scope.REQUEST,
      useFactory: (request: Request) => {
        const tenantId = request.header('x-tenant-id');
        if (tenantId) {
          return getTenantDataSource(parseInt(tenantId));
        }
      },
      inject: [REQUEST],
    },
  ],
  exports: [TENANT_DATA_SOURCE],
})
export class TenancyModule {}
