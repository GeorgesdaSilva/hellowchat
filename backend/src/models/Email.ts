import {
   
    Model,
   
  } from "sequelize-typescript";


  class Email extends  Model<Email>{
   from:string;
   to:string;
   text:string;


  }

  export default Email;