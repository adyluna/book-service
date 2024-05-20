import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;

  @Unique
  @Column({ type: DataType.STRING(255), allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'modified_at', type: DataType.DATE, defaultValue: DataType.NOW })
  modifiedAt: Date;
}