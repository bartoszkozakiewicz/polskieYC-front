import { NextResponse } from "next/server";

export function middleware(req) {
    // console.log("Middleware user ", "cookies: ", req.cookies, " headers: ", req.headers);
    
    if (true) {
        return NextResponse.next();
    }
    
}