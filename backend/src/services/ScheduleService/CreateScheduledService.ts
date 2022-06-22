import AppError from "../../errors/AppError";

import Scheduled from "../../models/Scheduled";

interface Request {

    startDate: Date, endDate: Date, externals: Array<Object>, anfitriao: string, attendants: Array<Object>, title: string, locale: string, description: string, typeEvent: number, recorrency: number, level: number, notificationType: Array<number>, datesNotify: Array<Date>
}

const CreateScheduledService = async ({
    startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify
}: Request): Promise<Scheduled> => {

    const scheduled = await Scheduled.create({
        startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify
    })
    if (!scheduled) {
        throw new AppError("erro ao criar agendamento")
    }

    return scheduled;
};

export default CreateScheduledService;
