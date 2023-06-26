"use strict";
const { pick } = require("lodash");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async (ctx) => {
    console.log("--------in find blogs listing query----------");
    try {
      let blogs = await strapi.services.blogs.find({ ...ctx.query });
      return filterFields(blogs, [
        "id",
        "title",
        "content",
        "thumbnail",
        "createdAt",
      ]);
      //   return blogs;
    } catch (ex) {
      return ex.message;
    }
  },
  findOne: async (ctx) => {
    console.log("--------in find single blog query----------");
    try {
      let data = await strapi.services.blogs.findOne({ id: ctx.params.id });

      let { gallery, thumbnail } = data;
      let newGallery = [];
      for (let item of gallery) {
        newGallery.push({
          id: item.id,
          name: item.name,
          ext: item.ext,
          mime: item.mime,
          size: item.size,
          width: item.width,
          height: item.height,
          url: item.url,
          formats: item.formats,
        });
      }

      const newThumbnail = {
        id: thumbnail.id,
        name: thumbnail.name,
        ext: thumbnail.ext,
        mime: thumbnail.mime,
        size: thumbnail.size,
        width: thumbnail.width,
        height: thumbnail.height,
        url: thumbnail.url,
        formats: thumbnail.formats,
      };
      const blog = {
        id: data._id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        gallery: newGallery,
        thumbnail: newThumbnail,
      };

      return blog;
    } catch (ex) {
      return ex.message;
    }
  },
};

const filterFields = (q, fields) => {
  const data = q.map((item) => pick(item, fields));
  const blogs = data.map((item) => {
    delete item.thumbnail["_id"];
    delete item.thumbnail["alternativeText"];
    delete item.thumbnail["caption"];
    delete item.thumbnail["hash"];
    delete item.thumbnail["provider"];
    delete item.thumbnail["related"];
    delete item.thumbnail["createdAt"];
    delete item.thumbnail["created_by"];
    delete item.thumbnail["updatedAt"];
    delete item.thumbnail["updated_by"];
    delete item.thumbnail["__v"];

    return item;
  });
  return { blogs };
};
