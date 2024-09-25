'use client'
import PrimaryButton from "@/components/global/PrimaryButton"
import Link from "next/link"
import { useState } from "react"
export default function RegisterCard(){
    const [errorState, setErrorState] = useState("")
    return(
        <form 
        className="border-black border-[1px] p-[24px] min-w-[300px] flex flex-col items-center justify-between font-montserrat rounded-[3px] gap-[48px]"
        >
            <div/>
            <div className="w-full flex flex-col gap-[12px]">
                <h1 
                className="text-[32px] text-center font-bold"
                >
                    Register
                </h1>
                <input 
                className="focus:outline-none focus:shadow-outline w-full p-[12px] rounded-[3px] border "
                type="text"
                name={"username"}
                placeholder="Username"
                />
                <input 
                className="focus:outline-none focus:shadow-outline w-full p-[12px] rounded-[3px] border "
                type="email"
                name={"email"}
                placeholder="Email"
                />
                <input 
                className="focus:outline-none focus:shadow-outline w-full p-[12px] rounded-[3px] border"
                type="password"
                name={"password"}
                placeholder="Password"
                />
                <p 
                className='text-red-500 text-center text-[12px]'
                >
                    {errorState || "\u00A0"}
                </p>
                <div className="w-full flex justify-end">
                    <PrimaryButton>
                        Submit
                    </PrimaryButton>
                </div>
            </div>
            <p
            className="text-[12px]"
            >
                Do you have an account? <Link className="hover:underline" href={"/"}>Sign Up</Link>
            </p>
        </form>
    )
}