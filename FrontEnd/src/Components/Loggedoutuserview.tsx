import {Button} from "react-bootstrap";
// import {LoginInput, signUpInput} from "../Network/licence.ts";
// import * as licenceApi from "../Network/licence.ts"
// import {users} from "../Model/users.ts";

interface LoggedInProps{
    onLogInClick : (  ) => void
    onSignInClick : (  ) => void
}

export function Loggedoutuserview({ onSignInClick, onLogInClick} : LoggedInProps){

    return(
        <>
            <Button onClick={onLogInClick}>Login</Button>
            <Button onClick={onSignInClick}>Sign In</Button>
        </>
    )
}