const { Schema, model, Types } = require('mongoose');
// const moment = require('moment');


const TaskSchema = new Schema (
    {
        taskText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
  }
)


const Task = model('Task', TaskSchema); 


module.exports = Task;