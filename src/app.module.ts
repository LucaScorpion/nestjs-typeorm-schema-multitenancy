import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { publicOrmConfigFactory } from './orm.config';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenantsModule } from './public/tenants/tenants.module';
import { CatsModule } from './tenanted/cats/cats.modules';
import { TenantMiddleware } from './tenant.middleware';
import { LimitMiddleware } from './limit.middleware';

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
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('api')
      .apply(LimitMiddleware)
      .forRoutes('api');
  }
}
