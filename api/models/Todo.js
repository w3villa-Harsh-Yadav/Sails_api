/**
 * Todo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    uuid:{
      type:'string',
      required:true,
    },
    taskname:{
      type:'String',
      required:true
    },
    description:{
      type:'String',
      required:true,
    }
  },
};

