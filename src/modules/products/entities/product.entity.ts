import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductInterface } from "../interfaces/product.interface";

@Entity({
    name: 'products',
    synchronize: true
})
export class Product extends BaseEntity implements ProductInterface {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "varchar", nullable: false })
    public name: string

    @Column({ type: "double", nullable: false })
    public price: number;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}