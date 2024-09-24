import { AiOutlineUser } from "react-icons/ai";


export default function Navbar(){
    return(
        <div className="w-full px-[24px] py-[10px] flex justify-between bg-white text-black items-center font-montserrat fixed border-b-[1px] border-b-black drop-shadow-sm z-[2]">
            <h1 className="font-graduate font-black text-[32px]">PROJECT</h1>
            <div className="flex gap-[12px] font-graduate font-bold items-center">
                <div className="flex flex-col text-[24px]">
                    <h2>Level 0</h2>
                    <div className="w-[100%] bg-black h-[2px]"/>
                </div>
                <div className="text-[32px]">
                    <AiOutlineUser />
                </div>
            </div>
        </div>
    )
}