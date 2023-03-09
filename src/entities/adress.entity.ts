import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  AfterInsert,
} from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity("Address")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ length: 45 })
  street: string;
  @Column({ length: 8 })
  zipCode: string;
  @Column({ type: "varchar", length: 7, nullable: true })
  number: string | undefined | null;
  @Column({ length: 20 })
  city: string;
  @Column({ length: 20 })
  state: string;
  @OneToOne(() => RealEstate, (realEstate) => realEstate.id)
  realEstate?: RealEstate;

  completeAddress: string;
  @AfterInsert()
  async concatenateColumns() {
    this.completeAddress =
      `${this.street}+${this.zipCode}+${this.number}+${this.city}+${this.state}`
        .toString()
        .toUpperCase();
  }
}

export { Address };
