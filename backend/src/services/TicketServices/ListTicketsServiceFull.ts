import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";

import Ticket from "../../models/Ticket";
import ListUsersService from "../UserServices/ListUsersService";

interface Request {
  dateInitial?: string;
  dateFinal?: string;
  userId?: string;


}
interface UsersRanking{
  id:number;
  name:string;
  countClosed:number;
  countOpen:number;
}
interface Response {
  // tickets: Ticket[];
  open: number;
  pending: number;
  closed: number;
  ticketsClosedByMoth: Array<number>;
  usersRanking: Array<UsersRanking>;
}

const ListTicketsServiceFull = async ({
  dateInitial, dateFinal, userId
}: Request): Promise<Response> => {
  let conditions = {}

  if (userId) {
    conditions = {
      ...conditions,
      userId: userId
    }

  }

  if (dateInitial
    && dateFinal) {
    
    var createdAt = { [Op.between]: [+startOfDay(parseISO(dateInitial)), +endOfDay(parseISO(dateFinal))] }
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

  var { users } = await ListUsersService({});
  var usersRanking = new Array();
  usersRanking = [];

  tickets.map((e) => {
    if (e.status === "closed" || e.status === "open" && e.userId !== null) {

      var objIndex = usersRanking.findIndex((obj => obj.id === e.userId));
      if (objIndex === -1) {
        
        let t = {
          id: e.userId,
          name: users.find((user) => user.id === e.userId)?.name || "",
          countClosed: 0,
          countOpen: 0
        }

        e.status === "closed" ? t.countClosed = 1 : t.countOpen = 1;
        usersRanking.push(t);

      } else {

        if (e.status === "closed" && usersRanking[objIndex]) {
          usersRanking[objIndex].countClosed += 1;
        } else if (usersRanking[objIndex]) {
          usersRanking[objIndex].countOpen += 1;
        }
      }
    }
  })

  var sortedArray: UsersRanking[] = usersRanking.sort((obj1, obj2) => {
    if (obj1.countClosed < obj2.countClosed) {
        return 1;
    }

    if (obj1.countClosed > obj2.countClosed) {
        return -1;
    }

    return 0;
});

  return {
    // tickets,
    ticketsClosedByMoth,
    open: agroupTickets[0],
    pending: agroupTickets[1],
    closed: agroupTickets[2],
    usersRanking: sortedArray

  };
};

export default ListTicketsServiceFull;
