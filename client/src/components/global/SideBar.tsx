import Link from "next/link";
import { AiOutlineProject,AiOutlineUnorderedList, AiOutlineLogout  } from "react-icons/ai";

export default function SideBar(){
    return(
        <div 
        className="px-[15px] pt-[81px] pb-[12px] bg-white h-screen flex flex-col text-[36px] text-black justify-between w-fit fixed z-[1] border-r-[1px] border-r-black"
        >
            <div 
            className="flex flex-col gap-[12px]"
            >
                <Link
                className="hover:shadow-lg" 
                href={'/projects'}>
                    <AiOutlineProject />
                </Link>
                <Link 
                className="hover:shadow-lg" 
                href={'/tasks'}>
                    <AiOutlineUnorderedList />
                </Link>
            </div>
            <div>
                <span className="hover:shadow-lg">
                    <AiOutlineLogout />
                </span>
            </div>
        </div>
    )
}