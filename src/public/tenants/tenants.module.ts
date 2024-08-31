import { AutoloadModule } from 'nestjs-autoloader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';

@AutoloadModule(__dirname, {
  imports: [TypeOrmModule.forFeature([Tenant])],
  exports: [TypeOrmModule.forFeature([Tenant])],
})
export class TenantsModule {}
