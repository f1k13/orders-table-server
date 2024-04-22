import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Comments } from "src/comments/comments.model";

interface OrderCreationAttributes {
  numberOrder: string;
  date: string;
  time: string;
  nameOfClientsCompany: string;
  nameOfCarrier: string;
  phoneNumberOfCarrier: string;
  statusOrder: string;
}

@Table({ tableName: "orders" })
export class Orders extends Model<Orders, OrderCreationAttributes> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataTypes.STRING,
    unique: true,
  })
  numberOrder: string;
  @Column({
    type: DataTypes.STRING,
  })
  date: string;
  @Column({
    type: DataTypes.STRING,
  })
  time: string;
  @Column({
    type: DataTypes.STRING,
  })
  nameOfClientsCompany: string;
  @Column({
    type: DataTypes.STRING,
  })
  nameOfCarrier: string;
  @Column({
    type: DataTypes.STRING,
  })
  phoneNumberOfCarrier: string;
  @Column({
    type: DataTypes.STRING,
  })
  statusOrder: string;
  @Column({
    type: DataTypes.STRING,
  })
  ati: string;
  @HasMany(() => Comments)
  comments: Comments[];
}
