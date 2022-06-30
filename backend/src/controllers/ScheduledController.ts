import { Request, Response } from "express";
import Ticket from "../models/Ticket";

import CreateScheduledService from "../services/ScheduleService/CreateScheduledService";
import DeleteScheduledService from "../services/ScheduleService/DeleteScheduledService";
import DetailsScheduledService from "../services/ScheduleService/DetailsScheduledService";
import ShowScheduleService from "../services/ScheduleService/ShowScheduledService";
import UpdateScheduledService from "../services/ScheduleService/UpdateScheduledService";
import FindOrCreateTicketService from "../services/TicketServices/FindOrCreateTicketService";
import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";
import ListWhatsAppsService from "../services/WhatsappService/ListWhatsAppsService";
import { parseEndDate, parseInitialDate } from "../utils/parserdate";

export const show = async (req: Request, res: Response): Promise<Response> => {

  const { date, number, searchParams } = req.body;


  const scheduleds = await ShowScheduleService({ date, number, searchParams });

  return res.status(200).json(scheduleds);
};

export const details = async (req: Request, res: Response): Promise<Response> => {

  const { id } = req.params;

  const scheduled = await DetailsScheduledService({ id });

  return res.status(200).json(scheduled);
};

export const store = async (req: Request, res: Response): Promise<Response> => {


  const { startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify, user } = req.body;

  const scheduled = await CreateScheduledService({ startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify, user });

  var phrase = `*Agendamento*\n*Título:* ${scheduled.title}\n*Anfitrião:* ${scheduled.anfitriao.name}\n*Data:* ${parseInitialDate(new Date(scheduled.startDate))} - ${parseEndDate(new Date(scheduled.endDate))}\n*Local:* ${scheduled.typeEvent === 1 ? 'local' : 'online'}  ${scheduled.locale}\n*Participantes:* ${scheduled.externals.map((e) => e.name + ", ")}${scheduled.attendants.map((i) => " " + i.name)}\n*Descrição:* ${scheduled.description}
 `

  var whatsappDefault = (await ListWhatsAppsService()).filter((e) => e.isDefault === true);

  notificationType?.map(async (e: number) => {
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

  return res.status(200).json();
};
export const update = async (req: Request, res: Response): Promise<Response> => {
  const { startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify, status } = req.body;
  const { id } = req.params;
  await UpdateScheduledService({ startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify, status, id });
  return res.status(200).json();
};
export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id, notify } = req.params;
  await DeleteScheduledService(id, notify);
  return res.status(200).json();
};
