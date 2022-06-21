import User from "../../models/User";
import AppError from "../../errors/AppError";
import Queue from "../../models/Queue";
import Whatsapp from "../../models/Whatsapp";
import Scheduled from "../../models/Scheduled";
import Contact from "../../models/Contact";
interface Request {
    id: string
}
const DetailsScheduledService = async ({ id }: Request): Promise<Scheduled> => {

    const scheduled = await Scheduled.findOne({ where: { id: id } });


    if (!scheduled) {
        throw new AppError('NOT_FOUND_SCHEDULED')
    }


    return scheduled;



};

export default DetailsScheduledService;
