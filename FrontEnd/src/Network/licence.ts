import axios from "axios";
import {users} from "../Model/users.ts";

export async function getLoggedInUser() : Promise<users>{
    // const config = {
    //     credentials :  true
    // }

    const response = await axios.get("https://driving-ls-1.onrender.com/api/users")
    return response.data
}

export interface LicenceInput{
    name : string,
    photograph : string
}

export async function getData() : Promise<LicenceInput[]>{
    const response = await axios.get("https://driving-ls-1.onrender.com/api/data")
    console.log(response.data)
    return response.data
}

export interface signUpInput{
    username : string,
    password : string,
    email: string
}


export async function signUp(input : signUpInput) : Promise<users>{
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }

        }

        const result = await axios.post("https://driving-ls-1.onrender.com/api/users/signUp", JSON.stringify(input), config)

        return  result.data

}

export interface LoginInput{
    username : string,
    password : string
}


export async function Login(input : LoginInput) : Promise<users>{



        const config = {
            headers : {
                'Content-Type': 'application/json'
            },
        }

        const result = await axios.post(
            "https://driving-ls-1.onrender.com/api/users/login",
            JSON.stringify(input),
            config,
        )

        return  result.data

}

export async function Logout(){
    await axios.post("https://driving-ls-1.onrender.com/api/users/logout")
}

export async function create(doc : LicenceInput) {
    const formdata = new FormData()


    formdata.append("name", doc.name)
    formdata.append("photograph", doc.photograph[0])


    console.log(doc)



    await axios.post("https://driving-ls-1.onrender.com/api/data", formdata, {
        headers : {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res=>{
        console.log("file uploaded")
        return res.data
    })
    .catch(err=>{
        console.log(err)
    })
}