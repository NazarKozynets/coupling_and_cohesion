import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ownerUserId!: string;

  @Column()
  name!: string;
}