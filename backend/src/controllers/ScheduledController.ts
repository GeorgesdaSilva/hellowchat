import { Request, Response } from "express";
import CreateScheduledService from "../services/ScheduleService/CreateScheduledService";
import DeleteScheduledService from "../services/ScheduleService/DeleteScheduledService";
import DetailsScheduledService from "../services/ScheduleService/DetailsScheduledService";
import ShowScheduleService from "../services/ScheduleService/ShowScheduledService";
import UpdateScheduledService from "../services/ScheduleService/UpdateScheduledService";

export const show = async (req: Request, res: Response): Promise<Response> => {

  const {startDate,endDate,number}=req.body;


  const scheduleds = await ShowScheduleService({startDate,endDate,number});

  return res.status(200).json(scheduleds);
};

export const details = async (req: Request, res: Response): Promise<Response> => {

const {id} = req.params;

  const scheduled = await DetailsScheduledService({id});

  return res.status(200).json(scheduled);
};

export const store = async (req: Request, res: Response): Promise<Response> => {


  const {  startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify } = req.body;

   await CreateScheduledService({ startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify });


  return res.status(200).json();
};

export const update = async (req: Request, res: Response): Promise<Response> => {


  const {  startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify,status } = req.body;
  const {id} = req.params;

   await UpdateScheduledService({ startDate, endDate, externals, anfitriao, attendants, title, locale, description, typeEvent, recorrency, level, notificationType, datesNotify,status,id });


  return res.status(200).json();
};



export const remove = async (req: Request, res: Response): Promise<Response> => {


  const {  id } = req.params;

   await DeleteScheduledService(id);


  return res.status(200).json();
};

// export const update = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   if (req.user.profile !== "admin") {
//     throw new AppError("ERR_NO_PERMISSION", 403);
//   }

//   const { userId } = req.params;
//   const userData = req.body;

//   const user = await UpdateUserService({ userData, userId });

//   const io = getIO();
//   io.emit("user", {
//     action: "update",
//     user
//   });

//   return res.status(200).json(user);
// };

// export const remove = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { userId } = req.params;

//   if (req.user.profile !== "admin") {
//     throw new AppError("ERR_NO_PERMISSION", 403);
//   }

//   await DeleteUserService(userId);

//   const io = getIO();
//   io.emit("user", {
//     action: "delete",
//     userId
//   });

//   return res.status(200).json({ message: "User deleted" });
// };
