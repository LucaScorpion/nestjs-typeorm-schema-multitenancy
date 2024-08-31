import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PUBLIC_SCHEMA } from '../../orm.config';

@Entity({ schema: PUBLIC_SCHEMA })
export class Tenant {
  @PrimaryGeneratedColumn()
  public id: number;
}
