import {Schema, InferSchemaType, model} from "mongoose";

const userSchema = new Schema({
    username : {type : String, required : true , unique : true},
    email : {type : String, required : true , selected : false, unique : true},
    password : {type : String, required : true , selected : false}
})

type user = InferSchemaType<typeof userSchema>

export default model<user>("user", userSchema)