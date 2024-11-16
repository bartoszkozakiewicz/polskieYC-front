import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../../../firebase/authMiddleware";

const prisma = new PrismaClient();

const searchCustomResults = async () => {};

export const POST = authMiddleware(searchCustomResults);
