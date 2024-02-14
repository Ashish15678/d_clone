import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { memberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    const id = "c05e47a1-bc0d-453b-988c-ddfc7dfa4839";
    // if (!profile) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const server = await db.server.create({
      data: {
        profileId: id,
        name,
        imageurl:imageUrl,
        invitecode: uuidv4(),
        channels: {
          create: [
            { name: "general", profileId: id }
          ]
        },
        members: {
          create: [
            { profileId: id, role: memberRole.ADMIN }
          ]
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}