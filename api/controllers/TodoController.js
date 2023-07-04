/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { v4: uuidv4 } = require('uuid');

module.exports = {
    createTask: async function(req,res){
        try {
            const { taskname , description } = req.body;
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

    getAllTask: async function ( req, res ) {
        try {
            const tasks = await Todo.find();
            if(tasks.length==0){
                return res.json({
                    status:true,
                    msg:'Currently there are no tasks present.'
                })
            }
            return res.json({
                status:true,
                tasks:tasks
            })
        } catch (error) {
            sails.log.error(error);
            res.status(500).json({
                status:false,
                msg:'Some internal error occured'
            })
        }
    },

    updateTask: async function ( req, res ) {
        try {
            const { uuid } = req.params;
            const { taskname, description } = req.body;
            const updated_task = await Todo.updateOne({ uuid: uuid })
            .set({
                taskname:taskname,
                description:description
            })

            if (!updated_task) {
                return res.status(400).json({
                    status:false,
                    msg:'Task could not be updated'
                })
            }

            return res.json({
                status:true,
                msg:'Task updated succesfully',
                task: updated_task
            })

        } catch (error) {
            sails.log.error(error);
            res.status(500).json({
                status:false,
                msg:'Some internal error occured'
            })
        }
    },

    deleteTask: async function ( req, res ) {
        try {
            const { uuid } = req.params;
            const task = await Todo.destroyOne({ uuid: uuid });
            if ( !task ) {
                return res.status(400).json({
                    status:false,
                    msg:'Task could not be deleted'
                })
            }
            return res.json({
                status:true,
                msg:'Task deleted succesfully'
            })
        } catch (error) {
            sails.log.error(error);
            res.status(500).json({
                status:false,
                msg:'Some internal error occured'
            })
        }
    }

};

