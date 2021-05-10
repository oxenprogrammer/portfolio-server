import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'varchar' })
  image: string;
}
