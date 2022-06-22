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

export const show = async (req: Request, res: Response): Promise<Response> => {

  const { date, number } = req.body;


  const scheduleds = await ShowScheduleService({date, number });

  return res.status(200).json(scheduleds);
};

export const details = async (req: Request, res: Response): Promise<Response> => {

  const { id } = req.params;

  const scheduled = await DetailsScheduledService({ id });

  return res.status(200).json(scheduled);
};

export const store = async (req: Request, res: Response): Promise<Response> => {


  const { startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify } = req.body;

  const scheduled = await CreateScheduledService({ startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify });
  const parseInitialDate = (date: Date) => {
    var currentdate = date;
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " "
      + currentdate.getHours() + ":"
      + `${currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()}` + " ";

    return datetime;
  }
  const parseEndDate = (date: Date) => {
    var currentdate = date;
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " "
      + currentdate.getHours() + ":"
      + `${currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()}` + " ";

    return datetime;
  }

  var phrase = `*Agendamento*
  *Título:* ${scheduled.title}
  *Anfitrião:* ${scheduled.anfitriao.name}
  *Data:* ${parseInitialDate(new Date(scheduled.startDate))} - ${parseEndDate(new Date(scheduled.endDate))}
  *Local:* ${scheduled.typeEvent === 1 ? 'local' : 'online'}  ${scheduled.locale}
  *Participantes:* ${scheduled.externals.map((e) => e.name + ", ")}${scheduled.attendants.map((i) => " "+i.name )}
  *Descrição:* ${scheduled.description}
 `

  var whatsappDefault = (await ListWhatsAppsService()).filter((e) => e.isDefault === true);
  await Promise.all(scheduled.externals.map(async (contact) => {
    var ticket: Ticket = await FindOrCreateTicketService(contact, whatsappDefault[0].id, 0, undefined, true);
    await SendWhatsAppMessage({ body: phrase, ticket })
  }))
  return res.status(200).json();
};
export const update = async (req: Request, res: Response): Promise<Response> => {
  const { startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify, status } = req.body;
  const { id } = req.params;
  await UpdateScheduledService({ startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify, status, id });
  return res.status(200).json();
};
export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  await DeleteScheduledService(id);
  return res.status(200).json();
};
