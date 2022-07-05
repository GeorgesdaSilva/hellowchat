import { Request, Response } from "express";
import * as Yup from "yup";
import AppError from "../errors/AppError";
import GetDefaultWhatsApp from "../helpers/GetDefaultWhatsApp";
import SetTicketMessagesAsRead from "../helpers/SetTicketMessagesAsRead";
import Message from "../models/Message";
import Ticket from "../models/Ticket";
import Whatsapp from "../models/Whatsapp";
import CreateOrUpdateContactService from "../services/ContactServices/CreateOrUpdateContactService";
import FindOrCreateTicketService from "../services/TicketServices/FindOrCreateTicketService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import CheckIsValidContact from "../services/WbotServices/CheckIsValidContact";
import CheckContactNumber from "../services/WbotServices/CheckNumber";
import GetProfilePicUrl from "../services/WbotServices/GetProfilePicUrl";
import SendWhatsAppMedia from "../services/WbotServices/SendWhatsAppMedia";
import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";

type WhatsappData = {
  whatsappId: number;
}

type MessageData = {
  body: string;
  fromMe: boolean;
  read: boolean;
  quotedMsg?: Message;
};

interface ContactData {
  number: string;
}

const createContact = async (
  whatsappId: number | undefined,
  newContact: string
) => {
  await CheckIsValidContact(newContact);

  const validNumber: any = await CheckContactNumber(newContact);

  const profilePicUrl = await GetProfilePicUrl(validNumber);

  const number = validNumber;

  const contactData = {
    name: `${number}`,
    number,
    profilePicUrl,
    isGroup: false
  };

  const contact = await CreateOrUpdateContactService(contactData);

  let whatsapp: Whatsapp | null;

  if (whatsappId === undefined) {
    whatsapp = await GetDefaultWhatsApp();
  } else {
    whatsapp = await Whatsapp.findByPk(whatsappId);

    if (whatsapp === null) {
      throw new AppError(`whatsapp #${whatsappId} not found`);
    }
  }

  const createTicket = await FindOrCreateTicketService(
    contact,
    whatsapp.id,
    1
  );

  const ticket = await ShowTicketService(createTicket.id);

  SetTicketMessagesAsRead(ticket);

  return ticket;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const newContact: ContactData = req.body;
<<<<<<< HEAD

=======
  const contacts = req.body as Array<ContactData>;
>>>>>>> scheduled
  const { whatsappId }: WhatsappData = req.body;
  var { body, quotedMsg }: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];

  if (newContact.number) {
    newContact.number = newContact.number.replace("-", "").replace(" ", "");
  }
<<<<<<< HEAD

  
=======
  if (contacts) {
    contacts.map((e) => e!.number = e.number.replace("-", "").replace(" ", ""));
  }


>>>>>>> scheduled

  const schema = Yup.object().shape({
    number: Yup.string()
      .required()
      .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
  });
<<<<<<< HEAD
  try {
    await schema.validate(newContact);
  } catch (err: any) {
    throw new AppError(err.message);
=======
  var newListContacts;
  if (contacts.length > 0) {

    Promise.all(contacts?.map(async (e) => {
      try {
        await schema.validate(e);
      } catch (err: any) {
        throw new AppError(err.message);
      }
    }))
    newListContacts = await Promise.all(contacts.map(async (e) => {
      return await createContact(whatsappId, newContact.number);
    }))
>>>>>>> scheduled
  }
  const contactAndTicket = await createContact(whatsappId, newContact.number);

  if (medias && body) {
<<<<<<< HEAD

    await Promise.all(
      medias.map(async (media: Express.Multer.File) => {
        await SendWhatsAppMedia({ body, media, ticket: contactAndTicket });
      })
    );
    await SendWhatsAppMessage({ body, ticket: contactAndTicket, quotedMsg });

  } else if (medias && !body) {

    await Promise.all(
      medias.map(async (media: Express.Multer.File) => {
        await SendWhatsAppMedia({ body, media, ticket: contactAndTicket });
      })
    );

  } else if (body) {

    await SendWhatsAppMessage({ body, ticket: contactAndTicket, quotedMsg });

  } else {
    throw new AppError('NOT_DATA_FOUND')
=======
    if (newListContacts) {
      Promise.all(newListContacts.map(async (e: Ticket) => {
        await Promise.all(
          medias.map(async (media: Express.Multer.File) => {
            await SendWhatsAppMedia({ body, media, ticket: e });
          })
        );
        await SendWhatsAppMessage({ body, ticket: e, quotedMsg });
      }))
    } else {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          await SendWhatsAppMedia({ body, media, ticket: contactAndTicket });
        })
      );
      await SendWhatsAppMessage({ body, ticket: contactAndTicket, quotedMsg });
    }
  } else if (medias && !body) {
    if (newListContacts) {
      Promise.all(newListContacts.map(async (e: Ticket) => {
        await Promise.all(
          medias.map(async (media: Express.Multer.File) => {
            await SendWhatsAppMedia({ body, media, ticket: e });
          })
        );
      }))
    }
    else {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          await SendWhatsAppMedia({ body, media, ticket: contactAndTicket });
        })
      );
    }
  } else {
    if (newListContacts) {
      Promise.all(newListContacts.map(async (e: Ticket) => {
        await SendWhatsAppMessage({ body, ticket: e, quotedMsg });
      }))
    }
    else {
      await SendWhatsAppMessage({ body, ticket: contactAndTicket, quotedMsg });
    }
>>>>>>> scheduled
  }

  return res.send();
};