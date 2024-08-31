import { Controller, Get } from '@nestjs/common';
import { TenantDataSource } from '../../tenancy/tenant-data-source.decorator';
import { DataSource, Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Controller('/api/cats')
export class CatsController {
  private readonly cats: Repository<Cat>;

  public constructor(@TenantDataSource() dataSource: DataSource) {
    this.cats = dataSource.getRepository(Cat);
  }

  @Get()
  public listCats(): Promise<Cat[]> {
    return this.cats.find();
  }
}
