import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@ankit1478/common-mediumproject"
import axios from "axios"
import { BACKEND_URL } from "../config";


export const SigninAuth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInput, setPostInput] = useState<SigninType>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInput);
            console.log("Response:", res.data); // Log the response data for inspection

            const jwt = res.data.jwt; // Extract JWT token from response data

            if (jwt) {
                localStorage.setItem("token", jwt);
                navigate("/blog");
            } else {
                console.error("No token received in response");
                // Handle error: No token received in response
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle other errors (e.g., network error, server error)
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? "Don't have an account" : "Already have an account?"}
                            <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signup" ? " Sign in" : " Sign up"}
                            </Link>
                        </div>
                    </div>


                    <div className="pt-2">
                        <LabelInput
                            label="Email"
                            placeholder="ankit@gmail.com"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInput((currentInput: any) => ({
                                    ...currentInput,
                                    email: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="pt-2">
                        <LabelInput
                            label="Password"
                            type="password"
                            placeholder="Password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPostInput((currentInput: any) => ({
                                    ...currentInput,
                                    password: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="pt-5">
                        <button
                            type="button"
                            className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 
                            focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center inline-flex items-center justify-center 
                            dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                            onClick={sendRequest}
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}


interface LableInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string,
}

export const LabelInput = ({ label, placeholder, onChange, type }: LableInputType) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black  font-bold">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}
