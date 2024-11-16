import mailgun from 'mailgun-js'

const mg = mailgun({
    apiKey:process.env.MG_API_KEY as string,
    domain:process.env.MG_DOMAIN as string
})

export const sendMail = async (from:string, to:string, text:string,  subject: string) =>{

    const data = {
        from: "Our email",
        to,
        subject,
        text
    }

    try{
        const mail_sent = await mg.messages().send(data)
        return mail_sent
            
    }catch (error){
        throw new Error(`Error duting mail sending: ${error}`)
    }

}