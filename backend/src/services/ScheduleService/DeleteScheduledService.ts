
import AppError from "../../errors/AppError";

import Scheduled from "../../models/Scheduled";


const DeleteScheduledService = async (id:string): Promise<void> => {
  
    try {
        await Scheduled.destroy({where:{id:id}})
    
    } catch (e) {
        throw new AppError("erro ao deletar agendamento")
    }

};

export default DeleteScheduledService;
