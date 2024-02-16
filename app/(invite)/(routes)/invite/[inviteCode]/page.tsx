import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { memberRole } from "@prisma/client"
import { redirect } from "next/navigation"

interface InvitePageProps{
    params:{
        inviteCode:string
    }
}
const InvitePage = async({params}:InvitePageProps) => {
    const inviteCode = params.inviteCode
    const profile = await currentProfile()
    if(!profile){
        return redirectToSignIn()
    }

    if(!params.inviteCode){
        return redirect("/")
    }
    
    const existingServer = await db.server.findFirst({
        where:{
            invitecode:params.inviteCode,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        } , 
    })
    
    if(existingServer){
        
        return redirect(`/servers/${existingServer.id}`)
    }

    const server = await db.server.update({
        where:{
            invitecode:inviteCode,
        },data:{
            members:{
                create:{
                    profileId:profile.id,
                    role:memberRole.GUEST
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`);
      }
  
    

    return null;
} 
export default InvitePage