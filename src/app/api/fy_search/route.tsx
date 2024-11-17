import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../../../firebase/authMiddleware";
import { queryFastApiEndpoint } from "@/utils/fetch/fetchFastApi";

const searchBusinessResults = async (req: NextRequest) => {
  const { user_data, type } = await req.json();
  console.log("User data: ", user_data);
  console.log("Type: ", type);

  const response = await queryFastApiEndpoint(
    "search/problems",
    { user_data, type },
    {},
    "POST",
  );
  console.log("res: ", response);
};

export const POST = authMiddleware(searchBusinessResults);
