import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

async function getUserDetails(request: NextRequest, { params }: Params) {
  const { id } = params;

  const item = { id, name: `Item ${id}` };

  return NextResponse.json(item);
}

async function deleteUserDetails(request: NextRequest, { params }: Params) {
  const { id } = params;

  return NextResponse.json({ message: `Item ${id} deleted` });
}

export const GET = getUserDetails;
export const DELETE = deleteUserDetails;
