const db = require('../models')

//working
const index = (req, res) => {
    console.log(req.user)
    // if (!req.user) {
    //     res.sendStatus(401)
    //     return
    // }
    db.goal.findAll(
    //     {
    //     where: { 
    //         userId: `${req.user.id}`
    //     },
    //     // include: [db.task]
    // }
    ).then((foundGoals) => {
        if(!foundGoals) return res.json({
            message: 'No goals found in database.'
        })
        res.status(200).json({ goals: foundGoals });
    })
}

//not working
const show = (req, res) => {
    console.log('in the show route')
    console.log(req.params)
  //not sure React side?
    db.goal.findByPk(req.params.id).then((foundGoal) => {
        if (!foundGoal) return res.json({
            message: 'goal with provided ID not found.'
        })
        
        res.status(200).json({ goal: foundGoal })
    })
}

//working
const create = (req, res) => {
    db.goal.create(req.body).then((savedGoal) => {
        // Validations and error handling here
        res.status(200).json({ goal: savedGoal })
    })
}

//not sure need to get show page working first
const update = (req, res) => {
    // console.log(req.body)
    // console.log(req.params)
    // debugger
    db.goal.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    }).then((updateGoals) => {
        if (!updateGoals) return res.json({
            message: "No goal with that ID found."
        })
        // Validations and error handling here
        res.status(200).json({ goal: updateGoals })
    })
}
//not sure
const destroy = (req, res) => {
    db.goal.destroy({
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
