import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  AfterLoad,
  OneToMany,
} from "typeorm";
import { Address } from "./adress.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedule.entity";

@Entity("RealEstate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ default: false })
  sold: boolean;
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;
  @Column()
  size: number;
  @CreateDateColumn({ type: "date" })
  createdAt: string;
  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address?: Address | null | undefined;
  @ManyToOne(() => Category, (category) => category, { nullable: true })
  category?: Category | null | undefined;
}

export { RealEstate };
