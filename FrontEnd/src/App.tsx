import './App.css'
import {Controller, useForm} from "react-hook-form";
import {getData, LicenceInput} from "./Network/licence.ts";
import {Button, Card, Form} from "react-bootstrap";
import {create} from "./Network/licence.ts";
import {useEffect, useState} from "react";
import { Buffer } from 'buffer';
import FormInput from "./Components/FormInput.tsx";
import {SignUpModal} from "./Components/SignupForm.tsx";
import {LoginModal} from "./Components/loginModal.tsx";
import {Navbar} from "./Components/navbar.tsx";
import {LoggedInPage} from "./Components/LoggedInPage.tsx";
import {users} from "./Model/users.ts";
import * as licence from "./Network/licence.ts";
import {LoggedOutPage} from "./Components/LoggedOutPage.tsx";



function App() {
    const [loggedInUser, setLoggedInUser] = useState<users| null>(null)
    const [showsignup, setShowsignup] = useState(false)
    const [showlogin, setShowlogin] = useState(false)

    useEffect(() => {
        async function getUser(){
            try {
                const newUser = await licence.getLoggedInUser()
                setLoggedInUser(newUser)
            }catch (err){
                console.error(err)
            }

        }
        getUser()
    }, []);

    console.log(loggedInUser)


    // function  convertToBase64(url : string, callback) {
    //   const image = new Image()
    //     image.crossOrigin='anonymous'
    //     image.onload =()=>{
    //       const canvas = document.createElement('canvas')
    //         const dataU
    // }fetch(url)
    //         .then(res => res.blob())
    //         .then(blob => new Promise((resolve, reject) => {
    //             const fileReader = new FileReader();
    //             fileReader.onload = () => resolve(fileReader.result)
    //             fileReader.onerror = reject
    //             fileReader.readAsDataURL(blob)
    //         }))
    // }
    function convertToBase64(input )
    {
      return new Promise((resolve, reject)=>{
          const fileReader = new FileReader();
          fileReader.readAsDataURL(input);
          fileReader.onload = () => {
              resolve(fileReader.result)
          }
          fileReader.onerror = (error) =>{
              reject(error)
          }
      })
    }



  return (
      <>
          <Navbar
              loggedinuser={loggedInUser}
              signinclicked={()=>setShowsignup(true)}
              loginclicked={()=>setShowlogin(true)}
              logoutclicked={()=>setLoggedInUser(null)}
          />
          {loggedInUser ? <LoggedInPage/> : <LoggedOutPage/>}

          { showsignup &&
            <SignUpModal
            onDismiss={() => {setShowsignup(false)}}
            onSuccessfulSignUp={(user) => {
                setLoggedInUser(user)
                setShowsignup(false)
            }}
        />
        }
        { showlogin &&
            <LoginModal
            onDismiss={() => {setShowlogin(false)}}
            onSuccessfulLogin={(user) => {
                setLoggedInUser(user)
                setShowlogin(false)
            }}
        />
        }
    </>
  )
}

export default App
