"use client"

import { Tooltip,TooltipProvider,TooltipContent,TooltipTrigger } from "@/components/ui/tooltip"

interface ActionToolTipProps{
    label:string;
    children: React.ReactNode;
    side? : "left" | "right" | "top" | "bottom";
    align? : "start" | "center" | "end";
}

export const ActionToolTip = ({label,children,side,align}:ActionToolTipProps) =>{
    return(
        <>
        <TooltipProvider>
            <Tooltip delayDuration={50} > 
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                <p className="font-semibold text-sm capitalize">
                    {label.toLowerCase()}
                </p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </>
    )
}