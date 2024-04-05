import {Button, Card, Form} from "react-bootstrap";
import FormInput from "./FormInput.tsx";
import {useForm} from "react-hook-form";
import {create, getData, LicenceInput} from "../Network/licence.ts";
import {useState} from "react";

export function LoggedInPage(){
    const { register, handleSubmit, formState : {errors} } = useForm<LicenceInput>()

    const [image, setImage] = useState<string>("")


    async  function onsubmit(input : LicenceInput){
        try {
            await create(input)
            const img = await getData()
            img.map(image=>setImage(image.photograph))
            //const image = new Image();


            console.log(img)

        }catch (err){
            console.error(err)
            alert(err)
        }
    }

    return(
        <Card>
            <Form  method="POST" encType="multipart/form-data" id="submitForm" onSubmit={handleSubmit(onsubmit)}>
                <FormInput
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Name"
                    register={register}
                    registerOption={{required:"required"}}
                    errors={errors.name}
                />
                <FormInput
                    name="photograph"
                    label="Photograph"
                    type="file"
                    placeholder="photograph"
                    register={register}
                    registerOption={{required:"required"}}
                    errors={errors.photograph}
                />
            </Form>
            <Button type="submit" form="submitForm">submit</Button>
            <div className="m-5">
                <img src={image}/>
            </div>

        </Card>
    )
}

