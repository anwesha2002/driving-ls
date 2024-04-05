import {Button, Modal} from "react-bootstrap";
import FormInput from "./FormInput.tsx";
import {useForm} from "react-hook-form"
import {LoginInput} from "../Network/licence.ts";
import * as licence from "../Network/licence.ts";
//import utilstyle from "../util/utils.style.css"
import {users} from "../Model/users.ts";

interface LoginMoalProps{
    onDismiss : () => void
    onSuccessfulLogin : (input : users) => void
}

export function LoginModal({ onSuccessfulLogin, onDismiss} : LoginMoalProps){

    const {  register, handleSubmit, formState:{errors, isSubmitting} } = useForm<LoginInput>()

    async function onSubmit(input : LoginInput){
        try {
            const user = await licence.Login(input)
            onSuccessfulLogin(user)

        }catch (er){
            console.log(er)
            alert(er)
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Login </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        name="username"
                        label="Username"
                        register={register}
                        placeholder="Username"
                        type="text"
                        errors={errors.username}
                        registerOption={{required:"Required"}}
                    />
                    <FormInput
                        name="password"
                        label="Password"
                        register={register}
                        placeholder="Password"
                        type="password"
                        errors={errors.password}
                        registerOption={{required:"Required"}}
                    />
                    <Button type="submit" disabled={isSubmitting}>Login</Button>
                </form>
            </Modal.Body>
        </Modal>

    )
}