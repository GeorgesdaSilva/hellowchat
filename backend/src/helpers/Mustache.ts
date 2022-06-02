import Mustache from "mustache";
import Contact from "../models/Contact";

const hash = `${new Date().toLocaleString().replace(/[.,-,/]/g,"").substring(0,8)}${Math.floor(Math.random()*9999)}` ;
export default (body: string, contact: Contact): string => {
  const view = {
    name: contact ? contact.name : "",
    protocolo: hash
  };
  return Mustache.render(body, view);
};
