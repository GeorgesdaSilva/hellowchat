import { QueryInterface } from "sequelize";




const date = new Date();
const start1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0);
const end1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
const start2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0);
const end2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0);
module.exports = {
  up: async (queryInterface: QueryInterface) => {

    // var models = initModels(sequelize);
    // const data = [
    //   {
    //     message: "",
    //     days: [
    //       `{ "index": ${0}, "label": "Domingo", "open": ${false}, "start1": "${start1.toISOString()}","end1": "${end1.toISOString()}", "start2": "${start2.toISOString()}", "end2": "${end2.toISOString()}"}`
    //     ],
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ];

    //  const openingHours=await  OpeningHours.findOne({where:{id:1}})
    //  openingHours?.update({
    //   days:[
    //     new DayOfWeek( { index: 0, label: "Domingo", open: false, start1: start1, end1: end1, start2: start2, end2: end2 })
    //   // { index: 0, label: "Domingo", open: false, start1: start1, end1: end1, start2: start2, end2: end2 },
    //   // { index: 1, label: "Segunda", open: true, start1: start1, end1: end1, start2: start2, end2: end2 },
    //   // { index: 2, label: "Terça", open: true, start1: start1, end1: end1, start2: start2, end2: end2 },
    //   // { index: 3, label: "Quarta", open: true, start1: start1, end1: end1, start2: start2, end2: end2 },
    //   // { index: 4, label: "Quinta", open: true, start1: start1, end1: end1, start2: start2, end2: end2 },
    //   // { index: 5, label: "Sexta", open: true, start1: start1, end1: end1, start2: start2, end2: end2 },
    //   // { index: 6, label: "Sábado", open: false, start1: start1, end1: end1, start2: start2, end2: end2 }

    // ]
    // //  })
    // return queryInterface.bulkInsert(
    //   "OpeningHours",
    //   data,
    //   {
    //     logging: true,
    //     raw: true,


    //   },


    // );



      var query = 'INSERT INTO "OpeningHours" ("message","days","createdAt","updatedAt") \
      VALUES (:message,ARRAY[:array]::jsonb[],:createdAt,:updatedAt)'

      return queryInterface.sequelize.query(query, {
        replacements: {

          message: "test",
          array:`{ "index": ${0}, "label": "Domingo", "open": ${false}, "start1": "${new Date(start1)}","end1": "${new Date(start1)}", "start2": "${new Date(start1)}", "end2": "${new Date(start1)}"}`,

          
          createdAt: new Date(),
          updatedAt: new Date()

        },
    })
  },


  // { "index": 2, "label": "Terça", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
  // { "index": 3, "label": "Quarta", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
  // { "index": 4, "label": "Quinta", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
  // { "index": 5, "label": "Sexta", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
  // { "index": 6, "label": "Sábado", "open": false, "start1": start1, "end1": end1, "start2": start2, "end2": end2 }

  // }


  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("OpeningHours", {});
  }
};

