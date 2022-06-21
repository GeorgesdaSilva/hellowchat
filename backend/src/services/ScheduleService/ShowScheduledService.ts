import User from "../../models/User";
import AppError from "../../errors/AppError";
import Queue from "../../models/Queue";
import Whatsapp from "../../models/Whatsapp";
import Scheduled from "../../models/Scheduled";
import Contact from "../../models/Contact";
import ShowUserService from "../UserServices/ShowUserService";
import GetContactService from "../ContactServices/GetContactService";
import { Sequelize, Op } from "sequelize";
import { query } from "express";
import sequelize from "../../database";
import { parseJSON } from "date-fns";
interface Request {
  startDate: Date;
  endDate: Date;
  number?: string;
}
const ShowScheduleService = async ({ startDate, endDate, number }: Request): Promise<Array<Scheduled>> => {

  var whereCondition;
  if (startDate && endDate) {
    whereCondition = {
      startDate: startDate,
      endDate: endDate,

    };

  }




  var scheduleds = await Scheduled.findAll({ where: whereCondition })
  if (!scheduleds) {
    throw new AppError('NOT_FOUND_SCHEDULEDS');
  }

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
