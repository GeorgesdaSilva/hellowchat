import AppError from "../../errors/AppError";
import CheckContactOpenTickets from "../../helpers/CheckContactOpenTickets";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import Scheduled from "../../models/Scheduled";
import ShowContactService from "../ContactServices/ShowContactService";

interface Request {

    startDate: Date, endDate: Date, externals: Array<Object>, anfitriao: string, attendants: Array<Object>, title: string, locale: string, description: string, typeEvent: number, recorrency: number, level: number, notificationType: Array<number>, datesNotify: Array<Date>
}

const CreateScheduledService = async ({
    startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify
}: Request): Promise<void> => {

   
    
    try {
        await Scheduled.create({
            startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify
        })
    } catch (e) {
        throw new AppError("erro ao criar agendamento")
    }


    // const defaultWhatsapp = await GetDefaultWhatsApp(userId);

    // await CheckContactOpenTickets(contactId, defaultWhatsapp.id);

    // const { isGroup } = await ShowContactService(contactId);

    // if (queueId === undefined) {
    //     const user = await User.findByPk(userId, { include: ["queues"] });
    //     queueId = user?.queues.length === 1 ? user.queues[0].id : undefined;
    // }

    // const durationDate = new Date();
    // const { id }: Ticket = await defaultWhatsapp.$create("ticket", {
    //     contactId,
    //     status,
    //     isGroup,
    //     userId,
    //     queueId,
    //     durationDate: durationDate
    // });


    // const ticket = await Ticket.findByPk(id, { include: ["contact"] });

    // if (!ticket) {
    //     throw new AppError("ERR_CREATING_TICKET");
    // }

    // return ticket;
};

export default CreateScheduledService;
