import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import {authMiddleware} from "../../../../firebase/authMiddleware";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
    try {
        const { userId, userForm} = await request.json();

        console.log("User Id: ", userId)
        console.log("User form:  ", userForm)

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required for update" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { localId: userId},
            data: { ...userForm}
        });

        return NextResponse.json(
            { msg: `User updated successfully`, updatedUser }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: `Internal server error: ${e}` },
            { status: 500 }
        );
    }
}


