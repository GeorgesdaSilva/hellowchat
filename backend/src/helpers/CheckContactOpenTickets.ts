import { Op } from "sequelize";
import AppError from "../errors/AppError";
import Ticket from "../models/Ticket";
import User from "../models/User";
const CheckContactOpenTickets = async (
  contactId: number,
  whatsappId: number
): Promise<void> => {
  const ticket = await Ticket.findOne({
    where: { contactId, whatsappId, status: { [Op.or]: ["open", "pending"] } }
  });

  if (ticket) {
    const user = await User.findOne({
      where: { id: ticket.userId }
    });

    throw new AppError("ERR_OTHER_OPEN_TICKET", 400, user?.name);
  }
};

export default CheckContactOpenTickets;
