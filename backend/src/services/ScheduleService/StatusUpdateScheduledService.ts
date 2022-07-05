
import Scheduled from "../../models/Scheduled";
import { Op } from "sequelize";
const StatusUpdateScheduledService = async (): Promise<void> => {
    var now = new Date()
    const initial = new Date(now.getFullYear(), now.getMonth(), now.getDate()).setUTCHours(now.getHours()+3, now.getMinutes(), 0, 0);//set +3 for timezone db
    const start_date = new Date(initial)
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate()).setUTCHours(now.getHours()+3, now.getMinutes(), 59, 999);//set +3 for timezone db
    const end_date = new Date(end)
    var whereCondition = {
        endDate: {
            [Op.gte]:
                start_date,
            [Op.lte]:
                end_date,
        },

    };
    const scheduledsNow = await Scheduled.findAll({ where: whereCondition });
    if (scheduledsNow.length > 0) {
        Promise.all(scheduledsNow.map(async (scheduled) => {
            await scheduled.update({ status: "finished" })
            await scheduled.reload();
        }))
    }
};
export default StatusUpdateScheduledService;
