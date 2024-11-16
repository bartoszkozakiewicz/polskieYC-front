import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import {authMiddleware} from "../../../../firebase/authMiddleware";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
    try {
        const { id, email, hasAccess } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "User ID is required for update" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { email, hasAccess }
        });

        return NextResponse.json(
            { msg: `User with ID ${id} updated successfully`, updatedUser }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: `Internal server error: ${e}` },
            { status: 500 }
        );
    }
}


