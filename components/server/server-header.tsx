"use client"

import { ServerWithMembersWithprofiles } from "@/types"
import { memberRole } from "@prisma/client";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, Plus, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server : ServerWithMembersWithprofiles;
    role?:memberRole
}
export const ServerHeader = ({server,role}:ServerHeaderProps) => {
    const {onOpen} = useModal()
    const isAdmin = memberRole.ADMIN
    const isModerator = isAdmin || memberRole.MODERATOR

    return (
        <>
        <div>
           
           <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] ">
                    {isModerator && (
                        <DropdownMenuItem className="px-3 py-2 text-sm text-green-300">Invite People
                        <UserPlus className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                        
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">Server Settings
                            <Settings className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                        
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">Manage Users
                        <Users className="ml-auto h-4 w-4 "/>
                        </DropdownMenuItem>
                        
                    )}
                    {isModerator && (
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">Create Channel
                        <Plus className="ml-auto h-4 w-4 "/>
                        </DropdownMenuItem>
                        
                    )}
                    {isModerator && (
                        <DropdownMenuSeparator/>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-700">Delete Server
                        <Trash className="ml-auto h-4 w-4 "/>
                        </DropdownMenuItem>
                        
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500">Leave server
                        <LogOut className="ml-auto h-4 w-4 "/>
                        </DropdownMenuItem>
                        
                    )}
                </DropdownMenuContent>
           </DropdownMenu>
        </div>
        
        </>
    )
}