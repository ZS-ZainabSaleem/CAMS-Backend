import { userEntity } from "src/user/Entities/user.entity";
import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'tenant' })
export class TenantEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;  

    @Column()
    password: string;
    
    @Column({ default: 'tenant' }) 
    role: string;

    @Column({ type: 'varchar', nullable: true })
    logo: string;

    @OneToMany(() => userEntity, user => user.tenant)
    users: userEntity[];
}
