import AppError from "../../errors/AppError";
import OpeningHours from "../../models/OpeningHour";



const ShowOpenHours = async (): Promise<OpeningHours> => {
    const openHours = await OpeningHours.findOne({ where: { id: 1 } });
    if (!openHours) {
        throw new AppError("ERR_NO_OPENHOURS_FOUND", 404);
    }



    return openHours;
};

export default ShowOpenHours;
