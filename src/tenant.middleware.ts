import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './public/tenants/tenant.entity';
import { Repository } from 'typeorm';
import { NextFunction } from 'express';
import { TenantRequest } from './tenant.request';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  public constructor(
    @InjectRepository(Tenant) private readonly tenants: Repository<Tenant>,
  ) {}

  public async use(req: TenantRequest, _: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];

    if (tenantId) {
      req.tenant = await this.tenants.findOneByOrFail({ id: tenantId });
    }

    next();
  }
}
