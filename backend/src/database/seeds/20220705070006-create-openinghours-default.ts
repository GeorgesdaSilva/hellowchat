import { QueryInterface } from "sequelize";
const date = new Date();
const start1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0);
const end1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
const start2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0);
const end2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0);
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    var query = 'INSERT INTO "OpeningHours" ("message","days","createdAt","updatedAt") \
      VALUES (:message,ARRAY[:array]::jsonb[],:createdAt,:updatedAt)'
    return queryInterface.sequelize.query(query, {
      replacements: {
        message: "Agradecemos sua mensagem, Não estamos disponíveis no momento, mas entraremos em contato assim que possível.",
        array: [`{ "index": ${0}, "label": "Domingo", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`, `{ "index": ${1}, "label": "Segunda", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`, , `{ "index": ${2}, "label": "Terça", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`, , `{ "index": ${3}, "label": "Quarta", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`, , `{ "index": ${4}, "label": "Quinta", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`, , `{ "index": ${5}, "label": "Sexta", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`, , `{ "index": ${6}, "label": "Sábado", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(end1)}", "start2": "${new Date(start2)}", "end2": "${new Date(end2)}"}`],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    })
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("OpeningHours", {});
  }
};

