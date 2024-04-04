import sharp from "sharp";
import path from "path";

const PROFILE_IMAGE_WIDTH = 700
const PROFILE_IMAGE_HEIGHT = 700

export async function profileImage(URL : string, image : Express.Multer.File | undefined , filename : string | undefined) : Promise<string> {

        //console.log(image)

        filename && await sharp(image?.buffer)
            .toFile(`images/${filename}`)

        const imgbuffer = await sharp(image?.buffer)
            .resize(PROFILE_IMAGE_WIDTH,PROFILE_IMAGE_HEIGHT, {withoutEnlargement: true})
            .toBuffer()


        return URL + `${imgbuffer.toString(`base64`)}`
}

