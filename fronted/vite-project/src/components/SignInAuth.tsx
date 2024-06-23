import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@ankit1478/common-mediumproject"
import axios from "axios"
import { BACKEND_URL } from "../config";


export const SigninAuth = ({ type }: { type: "signup" | "signin" }) => {
    const [error, setEror] = useState<string | null>(null);
    const [postInput, setPostInput] = useState<SigninType>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInput);

            const jwt = res.data.jwt;
            const id = res.data.user.id;
            const name = res.data.user.name;


            if (jwt) {
                localStorage.setItem("token", jwt);
                localStorage.setItem("user", id);
                localStorage.setItem("name", name)
                navigate("/blog");
            } else {
                console.error("No token received in response");
            }
        } catch (error) {
            setEror("error occurs")
        }
    }
    async function demo() {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxODhjNzMwLTcwOGQtNDkzZS05OTI0LTMxYzgwYzQ4YjE0MCJ9.gxFSV3p74IWDwmWEAVxYrLSOCAdshXHR_KLOrfoWkG8";
        const id = "b188c730-708d-493e-9924-31c80c48b140";
        const name = "Zuha";
        if (jwt) {
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", id);
            localStorage.setItem("name", name)
            navigate("/blog");
        }
        else
            setEror("error occurs")
    }

    return (
        <div>
            <div className="flex justify-center">
                {error && (
                    <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                            please Enter Valid details
                        </div>
                    </div>
                )}

            </div>

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
                        <button
                            type="button"
                            className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 
                            focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg 
                            text-sm px-5 py-2.5 text-center inline-flex items-center justify-center 
                            dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                            onClick={demo}> Demo
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
