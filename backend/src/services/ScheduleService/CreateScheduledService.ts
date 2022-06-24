import { endOfDay, startOfDay } from "date-fns";
import { Op } from "sequelize";
import AppError from "../../errors/AppError";

import Scheduled from "../../models/Scheduled";

interface Request {

    startDate: Date, endDate: Date, externals: Array<Object>, anfitriao: string, attendants: Array<Object>, title: string, locale: string, description: string, typeEvent: number, recorrency: number, level: number, notificationType: Array<number>, datesNotify: Array<Date>
}

const CreateScheduledService = async ({
    startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify
}: Request): Promise<Scheduled> => {


    // console.log(new Date(startDate).toISOString())
    // console.log(new Date(endDate).toISOString())
    // const containScheduled = await Scheduled.findOne({

    //     where: {
    //         startDate: {
    //             [Op.gte]:startDate
    //         },
    //         endDate:{
    //             [Op.lte]:startDate
    //         }
    //     },
    //      logging:true,
    //      raw:true
    // })

    // if (containScheduled) {
    //     console.log(containScheduled)
    //     throw new AppError('EXISTS_SCHEDULED_IN_DATE');
    // }


    const scheduled = await Scheduled.create({
        startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify
    })

    if (!scheduled) {
        throw new AppError("erro ao criar agendamento")
    }

    return scheduled;
};

export default CreateScheduledService;
