import {FieldError, RegisterOptions, UseFormRegister} from "react-hook-form";
import {Form} from "react-bootstrap";

interface FormInputProps {
    name :string
    label : string,
    register : UseFormRegister<any>,
    registerOption? : RegisterOptions,
    errors? : FieldError,
    [x: string] : any
}
export default function FormInput({name, label, registerOption, register, errors, ...props} : FormInputProps){
    return(
        <>
            <Form.Group controlId={name + "-input"}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    {...props}
                    {...register(name, registerOption)}
                    isInvalid={!!errors}
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.message}
                </Form.Control.Feedback>
            </Form.Group>

        </>
    )
}