import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Category from "./category";


@Table({
    underscored: true
})

export default class Main extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column
    name: string

    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    someId: string

    @AllowNull(false)
    @Column(DataType.DATE)
    date: Date

    @AllowNull(false)
    @Column(DataType.DECIMAL(10,2))
    price: number

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isBoolean: boolean
    
    @BelongsTo(() => Category)
    category: Category

}