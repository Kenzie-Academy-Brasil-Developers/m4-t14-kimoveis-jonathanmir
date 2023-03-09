import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity("Category")
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 45, unique: true })
  name: string;
  @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
  realEstate?: RealEstate[] | null | undefined;
}

export { Category };
