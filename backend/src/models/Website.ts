import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum WebsiteStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

@Entity("websites")
@Unique(["url"]) 
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  url: string;

  @Column({
    type: "enum",
    enum: WebsiteStatus,
    default: WebsiteStatus.OFFLINE,
  })
  status: WebsiteStatus;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
