import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/AppBar";
import { useNavigate } from "react-router-dom";

export const GenerativeAi = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const generateContent = async (prompt: string) => {
        try {
            const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDAyiMoen1zf8vjyKYf7f0gxQRmzyvG3fs",
                {
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            let generatedText = response.data.candidates[0].content.parts[0].text;

            generatedText = generatedText
                .replace(/##+/g, '')
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/- /g, '')
                .replace(/\n+/g, '\n');

            return generatedText;
        } catch (error) {
            console.error("Error generating content:", error);
            return "";
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const generatedContent = await generateContent(title);
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content: generatedContent
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        localStorage.setItem("authoId", res.data.user_id);
        localStorage.setItem("postId", res.data.id);
        setLoading(false);
        navigate(`/blog/${res.data.id}`);
    };

    return (
        <div>
            <Appbar />
            <div className="flex flex-col gap-8 p-4 md:p-10">
                <div className="my-2 w-full">
                    <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 text-gray-900 text-lg hover:border-blue-500 focus:border-blue-800 active:border-blue-800 outline-none block w-full p-4"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="my-1">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-0 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>
                </div>
                {loading && (
                    <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
