
import axios from "axios";
export const sendMailValidationEmail = async (data: any) => {

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify(data);
    let reqOptions = {
        url: `${process.env.LOCALURL}/api/sendemail`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    let response = await axios.request(reqOptions);
    return response.data
}
