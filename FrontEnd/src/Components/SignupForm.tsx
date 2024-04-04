import {Button, Form, Modal} from "react-bootstrap";
import FormInput from "./FormInput.tsx";
import {useForm} from "react-hook-form"
import { signUpInput} from "../Network/licence.ts";
import * as licence from "../Network/licence.ts";
import {users} from "../Model/users.ts";

interface signUpModalProps{
    onDismiss : () => void
   onSuccessfulSignUp : (input : users) => void
}

export function SignUpModal({ onSuccessfulSignUp, onDismiss} : signUpModalProps){

    const {  register, handleSubmit, formState:{errors, isSubmitting} } = useForm<signUpInput>()

    async function onSubmit(input : signUpInput){
        try {
            const newuser = await licence.signUp(input)
            onSuccessfulSignUp(newuser)

        }catch (er){
            console.error(er)
            alert(er)
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign UP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                        name="email"
                        label="Email"
                        register={register}
                        placeholder="Email"
                        type="email"
                        errors={errors.email}
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
                    <Button type="submit" disabled={isSubmitting}>SignUp</Button>
                </Form>
            </Modal.Body>
        </Modal>

    )
}