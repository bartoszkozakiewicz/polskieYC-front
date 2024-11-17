import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../../../firebase/authMiddleware";
import { queryFastApiEndpoint } from "@/utils/fetch/fetchFastApi";

const searchCustomResults = async (req: NextRequest) => {
  const data = await req.json();
  console.log("Data: ", data);
  const response = await queryFastApiEndpoint("test");
  console.log("res: ", response);
};

export const POST = authMiddleware(searchCustomResults);
