import express from "express";
import * as dataApi from "../routes/licence"
import multer from "multer";
import path from "path";
import {v4 as uuidv4} from "uuid";
import createHttpError from "http-errors";


const router = express.Router()

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


export const filestorage = multer.diskStorage({
    destination : (req , file : Express.Multer.File, cb ) =>{
          cb(null, './images')
    },
    filename : (req, file : Express.Multer.File, cb ) =>{
          cb(null, uuidv4() +'-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB limit
    },
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
            callback(null, true)
        else
            callback(createHttpError(400, "File must be a png or jpeg"))
    },
})

router.get("/", dataApi.getdata)
router.post("/", upload.single("photograph")  ,  dataApi.createData)

export default router