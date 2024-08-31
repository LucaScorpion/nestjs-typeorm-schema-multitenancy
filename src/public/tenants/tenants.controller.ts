import { Controller, Post } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { EntityManager, Repository } from 'typeorm';
import {
  getTenantDataSource,
  syncDataSource,
  tenantSchemaName,
} from '../../tenancy/tenant.data-source';

@Controller('/api/tenants')
export class TenantsController {
  public constructor(
    @InjectRepository(Tenant) private readonly tenants: Repository<Tenant>,
    @InjectEntityManager() private readonly manager: EntityManager,
  ) {}

  @Post()
  public async createTenant(): Promise<Tenant> {
    const tenant = await this.tenants.save(new Tenant());

    // Create a new schema for the tenant.
    const schema = tenantSchemaName(tenant.id);
    await this.manager.query(`CREATE SCHEMA "${schema}"`);

    // Get the data source and initialise the schema.
    const dataSource = await getTenantDataSource(tenant.id);
    await syncDataSource(dataSource);

    return tenant;
  }
}
