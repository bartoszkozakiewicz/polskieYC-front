import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../../../firebase/authMiddleware";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserDocuments(request: NextRequest) {
    try {
        const id  =  request.nextUrl.searchParams.get('id')
        console.log("ID", id);

        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Pobieranie pojedynczego użytkownika na podstawie ID
        const documents = await prisma.document.findMany({
            where: { userId: id }
        });

        if (documents) {
            return NextResponse.json({"documents" : documents});
        } else {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: `Internal server error: ${e}` },
            { status: 500 }
        );
    }
};

function genDocTransaction(id:string, operationCost:number){
    return prisma.$transaction(async (tx) =>{
        // 1.1 Take credits from user
        await prisma.user.update({
            where: { localId: id },
            data: { credentials: { decrement: operationCost } },
        });

        // 1.2 Generate the document


        // 1.3 If error happened, give credits back to user
        // 1.4 Return the document
        const document = await prisma.document.create({
            data: {
                title: "New Document",
                path: "New Path",
                type: "type",
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: "1"
            }
        });
    },{
        maxWait: 20000,
        timeout: 20000,
    })
}

async function generateDocument(request:NextRequest){
    try {
        const id  =  request.nextUrl.searchParams.get('id')
        const body = await request.json();

        console.log("Body in generate documents: ", body);

        // Check if user ID is provided
        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Check if user has enough credits
        const userCredentials = await prisma.user.findUnique({
            where: { localId: id },
            select: {
                credentials: true,
            }
        });
        console.log("User credentials: ", userCredentials);

        // --- No credits found 
        if (userCredentials?.credentials == undefined || !body.credentials){
            console.log("No credits found error");
            return NextResponse.json(
                { error: "Something went wrong when checking credits" },
                { status: 500 }
            );
        }

        // --- Not enough credits
        if (userCredentials?.credentials - body.credentials < 0){
            console.log("Too few credits error");
            return NextResponse.json(
                { error: "Not enough credits" },
                { status: 400 }
            );
        }

        // If user has enough credits, generate the document (start safe transaction)
        await genDocTransaction(id, body.credentials);


        return NextResponse.json(document);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: `Internal server error: ${e}` },
            { status: 500 }
        );
    }
}

export const GET = authMiddleware(getUserDocuments);
export const POST = authMiddleware(generateDocument);