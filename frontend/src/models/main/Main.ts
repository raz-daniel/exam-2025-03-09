import Category from "../category/Category";
import Draft from "./Draft";

export default interface Main extends Draft {
    id: string
    category: Category
    createdAt: Date
    updatedAt: Date
}