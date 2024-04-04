import {RequestHandler} from "express";
import createHttpError from "http-errors";
import userModel from "../model/user";
import bcrypt from "bcrypt"
import user from "../model/user";

export const GetLoggedInUser : RequestHandler = async (req,res, next) => {
    // const authenticatedUserId = req.session.userId

    try {
        // if(!authenticatedUserId){
        //     throw createHttpError(401,"user not exist")
        // }

        const user = await userModel.findById(req.session.userId).select("+email").exec()
        res.status(200).json(user)

    }catch (err){
        next(err)
    }
}

interface signUpprops{
    username : string,
    email : string,
    password : string
}
export const signUp : RequestHandler<unknown,unknown,signUpprops,unknown> = async (req, res, next) => {

        const username = req.body.username;
        const email = req.body.email;
        const rawPassword = req.body.password;
    try{
        if(!username || !email || !rawPassword){
            throw createHttpError(400, "parameters missing")
        }

        const existingUsername =  await userModel.findOne({username : username}).exec()
        const existingEmail =  await userModel.findOne({email : email}).exec()

        if(existingUsername || existingEmail){
            throw createHttpError(409, " username already exists, Please login instead")
        }

        const passwordHashed = await bcrypt.hash(rawPassword, 10)

        const newuser = await userModel.create({
            username : username,
            email : email,
            password : passwordHashed
        })

        req.session.userId = newuser._id

        res.status(201).send(newuser)

    }catch (err){
        console.log(err)
    }
}

interface LoginBody{
    username? : string,
    password? : string
}

export const Login : RequestHandler<unknown,unknown, LoginBody,unknown> = async (req,res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        if(!username || !password ){
            throw createHttpError(400, "parameters missing")
        }

        const user = await userModel.findOne({username : username}).select("+password +email").exec()

        if(!user){
            throw createHttpError(401, "invalid credentials")

        }

        const passwordmatch = await bcrypt.compare(password , user.password)

        if(!passwordmatch){
            throw createHttpError(400, "invalid credentials")
        }

        req.session.userId = user._id

        res.status(201).json(user)

    }catch (err){
        next(err)
    }
}

export const LogOut : RequestHandler = async (req, res, next) => {
    req.session.destroy(error=>{
        if(error){
            next(error)
        }else {
            res.sendStatus(200)
        }
    })
}

