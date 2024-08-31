import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { publicOrmConfigFactory } from './orm.config';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenantsModule } from './public/tenants/tenants.module';
import { CatsModule } from './tenanted/cats/cats.modules';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: publicOrmConfigFactory,
    }),
    TenancyModule,
    TenantsModule,
    CatsModule,
  ],
})
export class AppModule {}
