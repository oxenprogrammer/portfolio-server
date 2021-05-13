import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'varchar' })
  desc: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column('simple-array', { nullable: true })
  languages: string[];
}
