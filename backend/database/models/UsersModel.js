const mongose = require("mongoose");
const usersSchema = new mongose.Schema({
    username:{ type: String, min:3, max:150, required: true, unique:true },
    password:{ type: String, min:3, max:2500, required: true },
    image:{ type: String, required: true },
    email:{ type: String, required: true },
    birth_date:{type:Date, required:true}
})

const UserModel = new mongose.model("users", usersSchema);

module.exports = UserModel