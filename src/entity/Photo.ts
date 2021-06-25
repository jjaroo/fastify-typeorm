import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column({ type: 'text' })
  description!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
