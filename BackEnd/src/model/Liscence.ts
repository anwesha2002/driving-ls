import {Schema, InferSchemaType, model} from "mongoose";

const LicenceSchema = new Schema({
    userId : {type : Schema.Types.ObjectId, required : true},
    photograph : { type : String , required: true },
    name : { type : String, required: true}
})

type licence = InferSchemaType<typeof LicenceSchema>

export default model<licence>("licence", LicenceSchema )