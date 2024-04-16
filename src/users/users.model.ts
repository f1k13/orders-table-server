import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes {
  username: string;
  password: string;
  role: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  username: string;
  @Column({ type: DataTypes.STRING })
  password: string;
  @Column({ type: DataTypes.STRING })
  role: string;
}
