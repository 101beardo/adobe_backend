const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },
      bio: {
        type: String,
        maxlength: 200
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: {
        type: Date,
        default: Date.now
      }
})

const UserModel=mongoose.model("user",UserSchema)

module.exports={UserModel}


// id (unique identifier)
// name (string, 1-50 characters)
// email (string, valid email format)
// bio (optional string, 0-200 characters)
// created_at (timestamp, automatically set when the user is created)
// updated_at (timestamp, automatically updated when the user is updated)