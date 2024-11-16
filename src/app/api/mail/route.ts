import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/utils/mails/mailHandler";


async function handleMail(req:NextRequest, res:NextResponse){
    const { from, to, subject, text} = await req.json()

    try{
        const sent_mail = await sendMail(from,to,text,subject)
        console.log("Returned after mail sending: ", sent_mail)
        return NextResponse.json(
            { msg: `Mail sent successfully to ${to}` }
        );    }
    catch(e){
        return NextResponse.json(
            {error: `Error during mail sending: ${e}`},
            { status: 500 }
        )
    }

}