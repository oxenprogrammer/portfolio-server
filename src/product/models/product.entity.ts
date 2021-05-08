import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'varchar' })
  desc: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  price: string;
}
