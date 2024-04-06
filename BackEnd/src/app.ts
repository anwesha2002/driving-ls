import "dotenv/config";
import express, {NextFunction, Response, Request} from "express"
import userRoute from "./routes/users"
import licenceRoute from "./contollers/licence"
import createHttpError, {isHttpError} from "http-errors";
import cors from "cors"
import env from "./util/validateEnv";
import session from "express-session";
import MongoStore from "connect-mongo";
import {RequestAuth} from "./Middleware/auth";

const app = express();
app.use(express.urlencoded({extended : false}))

app.use(cors());
app.use(express.json())
app.set("trust proxy", 1);
app.use(session(({
    secret : env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie:{
        maxAge : 60* 60 *1000,
        sameSite: "none"
    },
    rolling : true,
    store : MongoStore.create({
        mongoUrl : env.MONGODB_CONNECTION_STRING
    })
})))
//app.use("/images", express.static("images"))

app.use("/api/users" , userRoute)
app.use("/api/data",RequestAuth, licenceRoute)


app.use((req, res, next)=>{
    next(createHttpError(404, "Endpoint not found"))
})

app.use((error : unknown, req :Request, res : Response, next : NextFunction)=>{
    console.error(error);
    let errorMessage = "An unknown error";
    let statusCode = 500
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error : errorMessage})
})
export default app
