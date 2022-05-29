import * as Yup from "yup";
import User from "../../models/User";
import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import Crypto from 'crypto';
const nodemailer = require('nodemailer')


interface Request {

  email: string;
}

interface Response {
  id: number;
  name: string;
  email: string;
  profile: string;
  password: string;

}

const ResetPassService = async ({
  email
}: Request): Promise<Response | undefined> => {



  const schema = Yup.object().shape({

    email: Yup.string().email(),

  });
  const user = await User.findOne({
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



  try {

    let transporter = nodemailer.createTransport({
      name: 'hostgator',
      host: process.env.SMTP_HOST ?? "",
      port: process.env.SMTP_PORT ?? 587,
      secure: process.env.SMTP_SECURE ?? false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER ?? "", // generated ethereal user
        pass: process.env.SMTP_PASS ?? "", // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM, // sender address
      to: user.email, // list of receivers
      subject: "Recuperação de senha.", // Subject line
      text: "Uma nova senha foi gerada para que você consiga acessar a plataforma novamente.", // plain text body
      html: `<div><h3>Sua nova senha é ${hash}</h3> </div>`, // html body
    });
  } catch (err) {
    throw new AppError(err.message);
  }

  await user.update({

    password: hash

  });





};

export default ResetPassService;
