import * as Yup from "yup";
import User from "../../models/User";
import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import Crypto from 'crypto';



interface Request {
  
  email: string ;
}

interface Response {
    id: number;
    name: string;
    email: string;
    profile: string;
    password:string;
 
}

const ResetPassService = async ({
 email
}: Request): Promise<Response | undefined> => {
 
  

  const schema = Yup.object().shape({
    
    email: Yup.string().email(),
    
  });
  const user= await User.findOne({
    where: { email: email },
  });
  if (!user) {
    throw new AppError("ERR_NO_USER_FOUND", 404);
  }

 
  // try {
  //   await schema.validate({ email, });
  // } catch (err) {
  //   throw new AppError(err.message);
  // }


  const hash = Crypto.createHash('md5').update('some_string').digest("hex");

  await user.update({
    
    password:hash
   
  });




  return SerializeUser(user);
};

export default ResetPassService;
