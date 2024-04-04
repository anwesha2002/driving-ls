import app from "./app"
import env from "./util/validateEnv";
import mongoose from "mongoose"

const port = env.PORT

mongoose.connect(env.MONGODB_CONNECTION_STRING)
    .then(()=>{
        console.log("mongoose connected")
        app.listen(port, () =>{
            console.log("server running in port" + port)
        })
    })
    .catch(console.error)


