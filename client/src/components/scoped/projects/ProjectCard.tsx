"use client"
import PrimaryButton from "@/components/global/PrimaryButton";
import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

export default function ProjectCard({title, desc, id}){
    const [isOpen,setIsOpen] = useState(false)
    return(
        <>
        <div>
            <div 
            className={"w-full p-[12px] bg-black text-white font-montserrat text-[24px] flex justify-between items-center transition-all duration-100 " + (isOpen?"rounded-t-[3px] rounded-b-[0px] delay-0":"rounded-t-[3px] rounded-b-[3px] delay-100")}
            onClick={()=>{
                setIsOpen(!isOpen)
            }}>
                <p>{title}</p>
                <div 
                className={"flex justify-center duration-75 " + (isOpen?"rotate-180":"rotate-0")}
                >
                    <AiOutlineCaretDown/>
                </div>
            </div>
            <div className={"w-full transition-all bg-white text-black rounded-b-[3px] flex flex-col flex-shrink p-[12px] gap-[12px] overflow-hidden duration-100 border-black "+(isOpen?"h-fit p-[12px] border-[1px]":"h-0 py-[0px] border-[0px]")}>
                <p className="text-justify">
                    {desc}
                </p>
                <div className="w-full flex justify-end">
                    <PrimaryButton>
                        Detail
                    </PrimaryButton>
                </div>
            </div>
        </div>
        </>
    )
}