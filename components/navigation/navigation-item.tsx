"use client"
import { useParams,useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ActionToolTip } from "../action-tooltip"

interface NavigationItemProps{
    id:string;
    imageUrl:string;
    name:string;
}

export const NavigationItem = ({id,name,imageUrl}:NavigationItemProps) =>{
    const params = useParams()
    const router = useRouter()
    return(
        <>
        <ActionToolTip 
        align="center"
        side="right"
        label={name}
        >
            <div>
                <button className="groupu relative flex items-center" onClick={()=>{
                    router.push(`/servers/${id}`)
                }}>
                    <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]"
                    , params?.serverId !== id && "group-hover:h-[20px]" 
                    , params?.serverId == id ? "h-[36px]" : "h-[8px]")} />
                    <div className={cn(
                        "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden"
                        , params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                    )}>
                        <Image 
                        fill
                        src={imageUrl}
                        alt="Channel"
                        />

                    </div>
                </button>
            </div>
        </ActionToolTip>
        </>
    )
}