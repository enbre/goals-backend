const db = require('../models')

//working
const index = (req, res) => {
  
    db.task.findAll(
        {
          order: ['createdAt']
    }
    ).then((foundTasks) => {
        if (!foundTasks) return res.json({
            message: 'No tasks found in database.'
        })

        res.status(200).json({ tasks: foundTasks });
    })
}

//not working
const show = (req, res) => {
    console.log('in the show route')
    console.log(req.params) 
    //not sure React side?
    db.task.findByPk(req.params.id).then((foundTask) => {
        if (!foundTask) return res.json({
            message: 'task with provided ID not found.'
        })

        res.status(200).json({ task: foundTask })
    })
}

//working
const create = (req, res) => {
    db.task.create(req.body).then((savedTask) => {
        // Validations and error handling here
        res.status(200).json({ task: savedTask })
    })
}

//not sure need to get show page working first
const update = (req, res) => {
    db.task.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    }).then((updateTask) => {
        if (!updateTask) return res.json({
            message: "No task with that ID found."
        })
        // Validations and error handling here
        res.status(200).json({ task: updateTask })
    })
}
//not sure
const destroy = (req, res) => {
    db.task.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200)
    })
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
