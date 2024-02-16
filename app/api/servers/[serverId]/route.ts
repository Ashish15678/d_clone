import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH({params,req}:{params:{serverId:string},req:Request}){
    try {
        const profile = await currentProfile()
        const {name,imageUrl} = await req.json()
        if(!profile){
            return new NextResponse("Unauthorized by me not clerk",{status:401})
        }
        const server = await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id
            },data:{
                name,
                imageurl:imageUrl,
            }
        })
    } catch (error) {
        console.log("ERROR AT SERVER IN PATCH @ /servers/serverId " , error);
        return new NextResponse("internal error",{status:500})   
    }
}

