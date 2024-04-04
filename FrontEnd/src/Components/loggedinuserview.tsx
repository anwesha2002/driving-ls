import {Button, Navbar} from "react-bootstrap";
import {users} from "../Model/users.ts";
import * as licenceApi from "../Network/licence.ts"

interface Loggedinuserview{
    user : users
    onlogoutclicked : () => void
}

export function Loggedinuserview({ user , onlogoutclicked} : Loggedinuserview){
    async function logout(){
        try {
            await licenceApi.Logout()
            onlogoutclicked()
        }catch (err){
            console.log(err)
            alert(err)
        }
    }

    return(
        <>
            <Navbar.Text>Logged in as : {user.username}</Navbar.Text>
            <Button onClick={logout}>Log Out</Button>
        </>
    )
}