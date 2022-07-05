
import Scheduled from "../../models/Scheduled";
import { Op } from "sequelize";
import ListWhatsAppsService from "../WhatsappService/ListWhatsAppsService";
import { parseEndDate, parseInitialDate } from "../../utils/parserdate";
import FindOrCreateTicketService from "../TicketServices/FindOrCreateTicketService";
import SendWhatsAppMessage from "../WbotServices/SendWhatsAppMessage";
import Ticket from "../../models/Ticket";


const NotificationScheduledService = async (): Promise<void> => {
    var data = new Date();
    data.setMilliseconds(0)
    const scheduleds = await Scheduled.findAll({
        where: {
            datesNotify: {
                [Op.contains]: [data.toISOString()]
            },
        }
    })
    var whatsappDefault = (await ListWhatsAppsService()).filter((e) => e.isDefault === true);
    scheduleds.map((scheduled) => {
        var phrase = `*Lembrete* \n*Título:* ${scheduled.title}\n*Anfitrião:* ${scheduled.anfitriao.name}\n*Data:* ${parseInitialDate(new Date(scheduled.startDate))} - ${parseEndDate(new Date(scheduled.endDate))}\n*Local:* ${scheduled.typeEvent === 1 ? 'local' : 'online'}  ${scheduled.locale}\n*Participantes:* ${scheduled.externals.map((e) => e.name + ", ")}${scheduled.attendants.map((i) => " " + i.name)}\n*Descrição:* ${scheduled.description}
   `
        scheduled.notificationType.map(async (e: number) => {

            if (e === 1) {
                await Promise.all(scheduled.externals.map(async (contact) => {
                    var ticket: Ticket = await FindOrCreateTicketService(contact, whatsappDefault[0].id, 0, undefined, true);
                    await SendWhatsAppMessage({ body: phrase, ticket })
                }))
            } else if (e === 2) {
                //enviar notificação pelo email
                return;
            } else {
                return;
            }
        })
    })


};

export default NotificationScheduledService;
