const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      trim: true,
      required: 'Username is Required'
    },
    email: {
      type: String,
      trim: true,
      unqiue: true,
      match: [/.+@.+\..+/]
    },
    Task: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Task'
        }
      ]
  //
});

const User = model('User', UserSchema);

module.exports = User;