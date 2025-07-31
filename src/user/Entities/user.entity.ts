import { TenantEntity } from "src/tenant/Entities/tenant.entity";
import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";

@Entity({ name: 'user' })
export class userEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

   @CreateDateColumn()
    createdAt: Date;  

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => TenantEntity, tenant => tenant.users, { onDelete: 'CASCADE' })
    tenant: TenantEntity;
}