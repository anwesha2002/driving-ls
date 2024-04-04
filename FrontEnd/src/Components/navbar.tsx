import {Navbar as NavbarBS} from "react-bootstrap";
import {users} from "../Model/users.ts";
import {Loggedinuserview} from "./loggedinuserview.tsx";
import {Loggedoutuserview} from "./Loggedoutuserview.tsx";

interface Navbarprops{
    loggedinuser : users | null
    loginclicked : ()=> void
    signinclicked : ()=> void
    logoutclicked : ()=> void
}

export function Navbar({ logoutclicked, loginclicked, signinclicked, loggedinuser } : Navbarprops){
    return(
        <>
            <NavbarBS variant="dark" bg="primary" expand="sm" sticky="top">
                <NavbarBS.Brand>
                    DL
                </NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="licecce-navbar"></NavbarBS.Toggle>
                <NavbarBS.Collapse id="licecce-navbar">
                    {
                        loggedinuser ?
                            <Loggedinuserview user={loggedinuser} onlogoutclicked={logoutclicked}/> :
                            <Loggedoutuserview onLogInClick={loginclicked} onSignInClick={ signinclicked}/>
                    }
                </NavbarBS.Collapse>
            </NavbarBS>
        </>
    )
}