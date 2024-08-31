import { Tenant } from './public/tenants/tenant.entity';
import { Request } from 'express';

export class TenantRequest extends Request {
  tenant: Tenant;
}
