
import { User } from "@sentry/node";
import { QueryTypes } from "sequelize";
import sequelize from "../../database";
import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";

import Scheduled from "../../models/Scheduled";


interface Request {

    startDate: Date, endDate: Date, externals: Array<Object>, anfitriao: string, attendants: Array<Object>, title: string, locale: string, description: string, typeEvent: number, recorrency: number, level: number, notificationType: Array<number>, datesNotify: Array<Date>,user:User
}

const CreateScheduledService = async ({
    startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify,user
}: Request): Promise<Scheduled> => {

    var query = ' \
    SELECT * FROM "Scheduleds" \
    AS "Scheduled" \
    WHERE ("Scheduled"."endDate" > :startDate \
    AND \
    "Scheduled"."startDate" < :endDate)\
  ';

    var scheduleds = await sequelize.query(
        query,
        {
            replacements: {

                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },

            type: QueryTypes.SELECT,
        },


    ) as Array<Scheduled>;
    var difference = Array();
    if (scheduleds) {
        var externalsContacts = externals as Array<Contact>;
        scheduleds.map((scheduled) => {
            scheduled.externals.map((e) => {
                externalsContacts.map((contact) => {
                    if (contact.number === e.number) {
                        difference.push(contact);
                    } else {
                        return;

                    }
                })

            })
        })
    }
    if (difference.length > 0) {

        var errorString = `${difference.length > 1 ? "Os contatos" : "O contato"} ${difference.map((e) => " " + e.name)}  ${difference.length > 1 ? "já estão com agendamento nesse horário. " : "já está com uma agendamento nesse horário."} `
        throw new AppError(errorString);
    }

    var startDate = new Date(startDate);
    var endDate = new Date(endDate);


    datesNotify.map((e)=>{
        return new Date(e);
    })
    const scheduled = await Scheduled.create({
        startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify,user
    })

    if (!scheduled) {
        throw new AppError("erro ao criar agendamento")
    }

    return scheduled;
};

export default CreateScheduledService;
