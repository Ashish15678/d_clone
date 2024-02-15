import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { channelType } from "@prisma/client"
import { redirect } from "next/navigation"
import { ServerHeader } from "./server-header"

interface ServerSideBarProps{
    serverId:string
}
export const ServerSideBar = async({serverId}:ServerSideBarProps) => {
    const profile = await currentProfile()
    if(!profile){
        redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where:{
            id:serverId
        },
        include:{
            channels:{
                orderBy:{
                    createdAt:"asc"
                }
            },members:{
                include:{
                    profile:true
                },orderBy:{
                    role:"asc"
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel)=>{channel.type == channelType.TEXT})
    const audioChannels = server?.channels.filter((channel)=>{channel.type == channelType.AUDIO})
    const videoChannels = server?.channels.filter((channel)=>{channel.type == channelType.VIDEO})

    const members = server?.members.filter((member)=>{member.id!==profile?.id})

    if(!server){
        return redirect("/")
    }

    const role = server.members.find((member)=>member.id === profile?.id)?.role




    return (
        <>
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5] ">
            <ServerHeader
            server={server}
            />
        </div>
        </>
    )
}