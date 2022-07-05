
import AppError from "../../errors/AppError";

import Scheduled from "../../models/Scheduled";
import Ticket from "../../models/Ticket";
import { parseEndDate, parseInitialDate } from "../../utils/parserdate";
import FindOrCreateTicketService from "../TicketServices/FindOrCreateTicketService";
import SendWhatsAppMessage from "../WbotServices/SendWhatsAppMessage";
import ListWhatsAppsService from "../WhatsappService/ListWhatsAppsService";


const DeleteScheduledService = async (id: string, notify: string): Promise<void> => {
    var notifyContacts = notify === "true" ? true : false;

    var scheduled = await Scheduled.findOne({
        where: {
            id: parseInt(id)
        }
    })
    if (scheduled && notifyContacts) {
        var phrase = `*Agendamento Cancelado*\n*Título:* ${scheduled.title}\n*Anfitrião:* ~${scheduled.anfitriao.name}~\n*Data:* ~${parseInitialDate(new Date(scheduled.startDate))} - ${parseEndDate(new Date(scheduled.endDate))}~\n*Local:*~ ${scheduled.typeEvent === 1 ? 'local' : 'online'}  ${scheduled.locale}~\n*Participantes:*~ ${scheduled.externals.map((e) => e.name + ", ")}${scheduled.attendants.map((i) => " " + i.name)}~\n*Descrição:* ~${scheduled.description}~
`
        var whatsappDefault = (await ListWhatsAppsService()).filter((e) => e.isDefault === true);
        await Promise.all(scheduled.externals.map(async (contact) => {
            var ticket: Ticket = await FindOrCreateTicketService(contact, whatsappDefault[0].id, 0, undefined, true);
            await SendWhatsAppMessage({ body: phrase, ticket })
        }))

    }
    try {

        await Scheduled.destroy({ where: { id: id } })

    } catch (e) {
        throw new AppError("erro ao deletar agendamento")
    }

};

export default DeleteScheduledService;
