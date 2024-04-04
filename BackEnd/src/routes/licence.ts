import LicenceModel from "../model/Liscence"
import express, {NextFunction, Request, RequestHandler, Response} from "express";
import * as fs from "fs";
import cloudinary from "../util/Clodinary";
import {v4 as uuidv4} from "uuid";
import path from "path";
import * as datasource from "../DataScource/ImageDataSource"
import {assesrtsDefined} from "../util/assesrtsDefined";


export const getdata = async (req : Request, res : Response) => {
    const authenticatedID = req.session.userId

    try{
        assesrtsDefined(authenticatedID)


        const licence = await LicenceModel.find({userId : authenticatedID}).exec();
        res.status(200).send(licence)
    }catch (error){
        console.log(error)
    }
};

interface input{
    name : string,
    photograph : string,

}

const cloudinaryImageUpload = async ( image : any) : Promise<any> => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(image, (_err : any , res : any) => {
            resolve({
                folder : "image",
                public_id : res.public_id,
                url : res.secure_url
            })
        })
    })
}



export const createData : RequestHandler<unknown, unknown, input, unknown> = async (req   ,res , next : NextFunction) => {

        //const URL = req.protocol + '://' + req.get("host") ;
        // const base64 = fs.readFileSync(`${req.file?.path}`, "base64")
        // const buffer = Buffer.from(base64, "base64")

        //const URL = `data:image/jpeg;base64,`
    const authenticatedID = req.session.userId


    try {
        assesrtsDefined(authenticatedID)

        const file =  req.file

        const filepath = file &&  uuidv4() +'-' + Date.now() + path.extname(file.originalname)

        const URL = `data:${file?.mimetype};base64,`

        console.log(file)

        const profileImage = await datasource.profileImage(URL,file,filepath)
        //console.log(profileImage)
        const photograph = profileImage
        const name = req.body.name
        const userId = authenticatedID


        const newData = await  LicenceModel.create({
            name ,
            photograph,
            userId
        })

        res.status(201).json(newData)

        // const licence = new LicenceModel(newData)
        //
        // console.log(req.file)
        //
        // licence.save()
        //     .then(() => res.status(201).json("uploaded"))
        //     .catch((err)=> res.status(400).json(err))

        // console.log(req.file)
        // console.log(req.body)

       // console.log(buffer)

        //res.status(201).send("data posted")
    }catch (err){
        console.log(err)
    }
}