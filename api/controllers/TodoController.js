/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { v4: uuidv4 } = require('uuid');

module.exports = {
    createTask: async function(req,res,next){
        try {
            const {taskname , description} = req.body;
            let temp_task = {
                uuid:uuidv4(),
                taskname: taskname,
                description: description
            }
            const task = await Todo.create(temp_task).fetch();
            if(!task){
                return res.json({
                    status:false,
                    msg:'Task could not be created.'
                })
            }
            return res.json({
                status:true,
                msg: 'Task created succesfully',
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status:false,
                msg:'Some internal error occured'
            })
        }
    },

    getAllTask: async function(req,res){
        try {
            const tasks = await Todo.find();
            if(tasks.length==0){
                res.json({
                    status:true,
                    msg:'Currently there are no tasks present.'
                })
            }
            res.json({
                status:true,
                tasks:tasks
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status:false,
                msg:'Some internal error occured'
            })
        }
    }
};

