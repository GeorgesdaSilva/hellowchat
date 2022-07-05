import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasMany,
    AutoIncrement,
    Default,
    Sequelize,
    DataType,

} from "sequelize-typescript";




import Contact from "./Contact";
import Message from "./Message";
import Queue from "./Queue";
import User from "./User";
import Whatsapp from "./Whatsapp";

@Table
class Scheduled extends Model<Scheduled> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ defaultValue: "open" })
    status: string;
    @Column
    title: string;

    @Column(DataType.JSONB)
    anfitriao: User;
    @Column(DataType.JSONB)
    user: User;

    @Column
    startDate: Date;

    @Column
    endDate: Date;

    @Column
    recorrency: number;
    @Column
    locale: string;
    @Column
    description: string;
    @Column
    typeEvent: number;
    @Column
    level: number;
    @Column(DataType.ARRAY(DataType.NUMBER))
    notificationType: Array<number>;

    @Column(DataType.ARRAY(DataType.STRING))
    datesNotify: Array<String>;

    @Column(DataType.ARRAY(DataType.JSONB))
    externals: Array<Contact>;
    
    @Column(DataType.ARRAY(DataType.JSONB))
    attendants: Array<User>;


    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;





    // @ForeignKey(() => User)
    // @Column
    // userId: number;

    // @BelongsTo(() => User)
    // user: User;

    // @ForeignKey(() => Contact)
    // @Column
    // contactId: number;

    // @BelongsTo(() => Contact)
    // contact: Contact;

    // @ForeignKey(() => Whatsapp)
    // @Column
    // whatsappId: number;

    // @BelongsTo(() => Whatsapp)
    // whatsapp: Whatsapp;

    // @ForeignKey(() => Queue)
    // @Column
    // queueId: number;

    // @BelongsTo(() => Queue)
    // queue: Queue;

    // @HasMany(() => Message)
    // messages: Message[];
}


export default Scheduled;
