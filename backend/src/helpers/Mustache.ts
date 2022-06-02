import Mustache from "mustache";
import Contact from "../models/Contact";
const hash = new Date().getTime() + new Date().getMilliseconds() ;
export default (body: string, contact: Contact): string => {
  const view = {
    name: contact ? contact.name : "",
    protocolo: hash.toString()
  };
  return Mustache.render(body, view);
};
