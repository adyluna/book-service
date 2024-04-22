import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

/**
 * Book entity.
 *
 * @class
 */
@Table({ tableName: 'books', timestamps: false, updatedAt: false })
export class Book extends Model {
  /**
   * Unique identifier for the book.
   */
  @PrimaryKey
  @Column({
    field: 'id',
    autoIncrement: true,
  })
  id: number;

  /**
   * Name of the book.
   */
  @Column({ field: 'name', allowNull: false })
  name: string;

  /**
   * Author of the book.
   */
  @Column({ field: 'author', allowNull: false })
  author: string;

  /**
   * Genre of the book.
   */
  @Column({ field: 'genre', allowNull: true })
  genre?: string;

  /**
   * Condition of the book.
   */
  @Column({ field: 'condition', allowNull: true })
  condition?: string;

  /**
   * Price of the book.
   */
  @Column({ field: 'price', allowNull: true })
  price?: number;

  /**
   * Quantity of the book.
   */
  @Column({ field: 'quantity', allowNull: false })
  quantity: number;
}