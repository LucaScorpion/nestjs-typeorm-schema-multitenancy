import { Inject } from '@nestjs/common';

export const TENANT_DATA_SOURCE = Symbol('TENANT_DATA_SOURCE');

export const TenantDataSource = () => Inject(TENANT_DATA_SOURCE);
