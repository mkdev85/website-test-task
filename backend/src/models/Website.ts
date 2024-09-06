
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

export enum WebsiteStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

@Entity("websites")
@Unique(["url"]) 
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255})
  url: string;

  @Column({
    type: "enum",
    enum: WebsiteStatus,
    default: WebsiteStatus.OFFLINE,
  })
  status: WebsiteStatus;
}
