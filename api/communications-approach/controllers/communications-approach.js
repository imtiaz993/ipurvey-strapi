"use strict";
const { find } = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async (ctx) => {
    console.log("--------in find communications-approach query----------");
    try {
      let channels = await strapi
        .query("messaging-channels")
        .model.find({})
        .select({
          name: 1,
        });

      let approaches = await strapi
        .query("communications-approach")
        .model.find({ ...ctx.query })
        .select({
          ref_id: 1,
          customer_life_cycle: 1,
          progress_category: 1,
          cohort_product: 1,
          communication_title: 1,
          purpose: 1,
          content: 1,
          notes: 1,
          messaging_channels: 1,
        });

      // console.log("channels", approaches[0]);

      const response = await filterFields(channels, approaches);

      return response;
    } catch (ex) {
      return ex.message;
    }
  },
};

const filterFields = async (channels, approaches) => {
  let communications = [];

  for (let approach of approaches) {
    let x = [];

    for (let a of approach.messaging_channels) {
      const { name } = await find(channels, ["_id", a]);
      x.push({ name });
    }
    communications.push({
      id: approach.id,
      ref_id: approach.ref_id,
      customer_life_cycle: approach.customer_life_cycle,
      progress_category: approach.progress_category,
      cohort_product: approach.cohort_product,
      communication_title: approach.communication_title,
      purpose: approach.purpose,
      content: approach.content,
      notes: approach.notes,
      channels: x,
    });
  }
  return { communications };
};
