import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../../../firebase/authMiddleware";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handleVoteChange(request: NextRequest){
    try{
        
    }
    catch(e){
        return NextResponse.json(
            { error: `Internal server error ${e}` },
            { status: 500 }
        );
    }
}




export const PATCH = authMiddleware(handleVoteChange)