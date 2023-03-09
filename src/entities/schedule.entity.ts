import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./users.entity";

@Entity("Schedule")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "date" })
  date: string;
  @Column({ type: "time" })
  hour: string;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => RealEstate)
  @JoinColumn()
  realEstate: RealEstate;
}

export { Schedule };
