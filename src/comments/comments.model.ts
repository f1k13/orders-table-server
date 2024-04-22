import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Orders } from "src/orders/orders.model";

interface CommentCreationAttributes {
  orderId: number;
  title: string;
}

@Table({ tableName: "comments" })
export class Comments extends Model<Comments, CommentCreationAttributes> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataTypes.STRING,
  })
  title: string;
  @ForeignKey(() => Orders)
  @Column({
    type: DataTypes.INTEGER,
  })
  orderId: number;
}
