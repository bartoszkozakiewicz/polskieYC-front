import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import {authMiddleware} from "../../../../firebase/authMiddleware";

const prisma = new PrismaClient();

export function POST(request:any) {
    return request.json()
        .then(( user:any ) => {
            console.log("User data", user);
            return prisma.user.create({
                data: user
            });
        })
        .then((newUser:any) => {
            return NextResponse.json({ "msg": "User created successfully" });
        })
        .catch((e:any) => {
            console.error(e);
            return NextResponse.json(
                { error: `Internal server error ${e}` },
                { status: 500 }
            );
        });
}

async function getUser(request: NextRequest) {
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
        const user = await prisma.user.findUnique({
            where: { localId: id }
        });

        if (user) {
            return NextResponse.json(user);
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
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const deletedUser = await prisma.user.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json(
            { msg: `User with ID ${id} deleted successfully`, deletedUser }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: `Internal server error: ${e}` },
            { status: 500 }
        );
    }
}

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

export const GET = authMiddleware(getUser);