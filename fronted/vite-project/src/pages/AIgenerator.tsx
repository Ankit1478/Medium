import React, { useEffect, useState } from 'react';
import { useSpeechRecognition } from './SpechtoText';
import { Appbar } from '../components/AppBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AI_URL, BACKEND_URL } from '../config';
import { AlertSignin } from '../components/SigninAlert';

export const GenerativeAi: React.FC = () => {
    const { text, listening, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition()();
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        setTitle(text);
    }, [text]);

    const extractTitle = (text: string) => {
        const lines = text.split('\n');
        return lines.length > 0 ? lines[0].replace('## ', '') : 'Untitled';
    };

    const generateContent = async (prompt: string) => {
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${AI_URL}`,
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

            const extractedTitle = extractTitle(generatedText);
            let len = extractTitle.length;
            setTitle(extractedTitle);
            const generatedTexts = generatedText.substring(len).trim();
            return generatedTexts;
        } catch (error) {
            console.error("Error generating content:", error);
            return "";
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!token) {
            navigate("/signin");
            return;
        }

        const generatedContent = await generateContent(title);

        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title: extractTitle(generatedContent),
            content: generatedContent
        }, {
            headers: {
                Authorization: token
            }
        });

        localStorage.setItem("authoId", res.data.user_id);
        localStorage.setItem("postId", res.data.id);
        setLoading(false);
        navigate(`/blog/${res.data.id}`);
    };

    return (
        <div>

            <div>
                <Appbar />
                <AlertSignin></AlertSignin>
                <div className="flex flex-col gap-8 p-4 md:p-10">
                    <div className="my-2 w-full">
                        <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 text-gray-900 text-lg hover:border-blue-500 focus:border-blue-800 active:border-blue-800 outline-none block w-full p-4"
                            placeholder="Say or Type write a blog.... "
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="my-2">
                        <div className="my-2">
                            <button className="mt-0 p-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"

                                onClick={startListening} disabled={listening}> {listening ? "Listing...." : "Search by voice"}</button> &nbsp;  &nbsp;
                            {hasRecognitionSupport ? (
                                <button className="mt-0 p-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                    onClick={stopListening} disabled={!listening}> Stop Listing  </button>
                            ) :
                                ""}

                        </div>
                        <div className="my-2">

                        </div>
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
                </div>
            </div>
        </div>
    );
};

