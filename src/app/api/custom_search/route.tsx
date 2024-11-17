import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../../../../firebase/authMiddleware";
import { queryFastApiEndpoint } from "@/utils/fetch/fetchFastApi";

const searchCustomResults = async (req: NextRequest) => {
  const {type, reqs} = await req.json();
  const response = await queryFastApiEndpoint("search", {user_type:type,query:reqs}, {}, "POST");
  console.log("res: ", response);
  return NextResponse.json({data:response});

};

export const POST = authMiddleware(searchCustomResults);
