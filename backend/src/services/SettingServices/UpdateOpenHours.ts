import AppError from "../../errors/AppError";
import OpeningHours from "../../models/OpeningHour";

const UpdateOpeningHours = async ({ openingHours }: { openingHours: OpeningHours }): Promise<void> => {
    const openingHoursDefault = await OpeningHours.findOne({ where: { id: 1 } });
    await openingHoursDefault?.update(openingHours);
    await openingHoursDefault?.reload();
    
    if (!openingHoursDefault) {
        throw new AppError("ERR_UPDATE_OPENINGHOURS", 404);
    }
};

export default UpdateOpeningHours;
