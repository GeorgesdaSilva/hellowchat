
import AppError from "../../errors/AppError";
import Scheduled from "../../models/Scheduled";
import { Op } from "sequelize";
interface Request {
  date?: Date;
  searchParams?:String;
  number?: string;
}
const ShowScheduleService = async ({ date, number,searchParams }: Request): Promise<Array<Scheduled>> => {
  var whereCondition;
  if (date) {
    date = new Date(new Date(date).toDateString());
    const initial = new Date(date.getFullYear(), date.getMonth(), date.getDate()).setUTCHours(0,0,0,0);
    const start_date= new Date(initial)
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate()).setUTCHours(23,59,59,999);
    const end_date= new Date(end)
    whereCondition = {
      startDate: {
        [Op.gt]:
          start_date,
        [Op.lte]:
          end_date,
      },
    };
  }
  if(searchParams){
    whereCondition = {
      title:{
        [Op.like]:`%${searchParams}%`
      }
    };
  }
  var scheduleds = await Scheduled.findAll({ where: whereCondition })
  if (!scheduleds) {
    throw new AppError('NOT_FOUND_SCHEDULEDS');
  }
  //criar nova query para melhorar o desempenho
  if (number) {
    scheduleds = scheduleds.filter(function (element) {
      return element.externals.some(function (subElement) {

        return subElement.number === number
      });
    });

  }
  return scheduleds;
};

export default ShowScheduleService;
