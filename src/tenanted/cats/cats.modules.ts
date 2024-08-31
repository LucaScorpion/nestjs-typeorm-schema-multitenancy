import { AutoloadModule } from 'nestjs-autoloader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';

@AutoloadModule(__dirname, {
  imports: [TypeOrmModule.forFeature([Cat])],
})
export class CatsModule {}
