
import { Column, CreatedAt, Model, PrimaryKey, UpdatedAt,DataType } from "sequelize-typescript";
import DayOfWeek from "./DayOfWeek";

class OpeningHours extends Model<OpeningHours>{
    @PrimaryKey
    @Column
    id: number;


    @Column
    message: string;
    


    @Column(DataType.ARRAY(DataType.JSONB))
    days: Array<DayOfWeek>;
   
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default OpeningHours