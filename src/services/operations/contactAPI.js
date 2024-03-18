import apiConnector from "../apiConnector"
import { contactusEndpoint } from "../api"
export async function submitContactForm(data,setLoading){
    console.log("contact form data",data)
    try {
        setLoading(true)
        // const response =await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data)
        const response ={status : "OK"}
        console.log("response", response)
        setLoading(false)
    } catch (error) {
        console.log("error", error.message)
        setLoading(false)
    }
}
