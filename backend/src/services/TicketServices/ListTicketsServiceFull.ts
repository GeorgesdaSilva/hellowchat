import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";

import Ticket from "../../models/Ticket";

interface Request {
  dateIni?: string;
  dateFin?: string;
  userId?: string;
 

}

interface Response {
  tickets: Ticket[];
  open: number;
  pending: number;
  closed: number;
  ticketsClosedByMoth: Array<number>;
}

const ListTicketsServiceFull = async ({
  dateIni, dateFin, userId
}: Request): Promise<Response> => {
  let conditions = {}

  if (userId) {
    conditions = {
      ...conditions,
      userId: userId
    }

  }
  if (dateIni
    && dateFin) {
    var createdAt = { [Op.between]: [+startOfDay(parseISO(dateIni)), +endOfDay(parseISO(dateFin))] }
    conditions = {
      ...conditions,
      createdAt
    }
  }

  let ticketsClosedByMoth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//moths


  let newConditions = {

    "updatedAt": {
      [Op.and]: {
        [Op.gte]: new Date(`${new Date().getFullYear()}-01-01 00:00:00`),
        [Op.lte]: new Date(`${new Date().getFullYear()}-12-31 00:00:00`)
      }
    },
    "status": "closed",

  }
  let whereConditions = {};
  if (userId) {

    whereConditions = {
      ...newConditions,
      "userId": userId
    }
  } else {
    whereConditions = { ...newConditions }
  }



  const { rows: allDataYear } = await Ticket.findAndCountAll({ where: whereConditions });
  allDataYear.map((e) => {
    ticketsClosedByMoth[e.createdAt.getMonth()] = ticketsClosedByMoth[e.createdAt.getMonth()] + 1;
  })
  const { rows: tickets } = await Ticket.findAndCountAll({
    where: conditions,
    order: [["updatedAt", "DESC"]]
  });

  let agroupTickets = [0, 0, 0]
  tickets.forEach(element => {

    if (element.status == 'open') {
      agroupTickets[0] += 1
    } else if (element.status == 'pending') {
      agroupTickets[1] += 1
    } else {
      agroupTickets[2] += 1
    }

  });

  return {
    tickets,
    ticketsClosedByMoth,
    open: agroupTickets[0],
    pending: agroupTickets[1],
    closed: agroupTickets[2]

  };
};

export default ListTicketsServiceFull;
