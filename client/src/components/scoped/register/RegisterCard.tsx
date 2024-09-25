'use client'
import PrimaryButton from "@/components/global/PrimaryButton"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterCard(){
    const router = useRouter()
    const [formData, setFormData] = useState({
        "username" : "",
        "email" : "",
        "password" : ""
    })
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState("")
    const handleChange = (e)=>{
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorState("");
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
    
            console.log('Registration successful:', response.data.message);
            setErrorState(response.data.message)
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorState(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
            router.push("/login")
        }
    }
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
                value={(formData.username)}
                onChange={handleChange}
                placeholder="Username"
                />
                <input 
                className="focus:outline-none focus:shadow-outline w-full p-[12px] rounded-[3px] border "
                type="email"
                name={"email"}
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                />
                <input 
                className="focus:outline-none focus:shadow-outline w-full p-[12px] rounded-[3px] border"
                type="password"
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                />
                <p 
                className='text-red-500 text-center text-[12px]'
                >
                    {errorState || "\u00A0"}
                </p>
                <div 
                className="w-full flex justify-end"
                onClick={handleSubmit}
                >
                    <PrimaryButton>
                        Submit
                    </PrimaryButton>
                </div>
            </div>
            <p
            className="text-[12px]"
            >
                Do you have an account? <Link className="hover:underline" href={"/"}>Login</Link>
            </p>
        </form>
    )
}