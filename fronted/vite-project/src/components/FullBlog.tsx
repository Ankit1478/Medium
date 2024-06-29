import axios from 'axios';
import { BlogComponent } from '../pages/Delete';
import { Update } from '../pages/EditButton';
import { Appbar } from './AppBar';
import { useState } from 'react';
import { TRANSLATE_KEY } from '../config';

interface Blog {
    author: {
        name: string;
    };
    content: string;
    id: string;
    title: string;
}

export const Fullblog = ({ author, id, content, title }: Blog) => {
    const [language, setLanguage] = useState<string>('en');
    const [translation, setTranslation] = useState<string>('');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
    ];

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const translateText = async () => {
        const options = {
            method: 'POST',
            url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
            headers: {
                'x-rapidapi-key': TRANSLATE_KEY,
                'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                from: 'auto',
                to: language,
                text: content
            }
        };

        try {
            const response = await axios.request(options);
            setTranslation(response.data.trans);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <Appbar />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

                <div className="max-w-5xl w-full bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                    <div className="md:flex">
                        <div className="p-6 md:p-8">
                            <div>
                                <h1 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">
                                    {title}
                                </h1>
                                <br />
                                <div className=' grid grid-cols-2'>
                                    <div className="flex  items-center tracking-wide text-m text-gray-500 font-semibold ">
                                        <Avatar name={author.name.toUpperCase()} /> &nbsp; &nbsp;by {author.name}
                                    </div>
                                    <div className="flex justify-end">
                                        <div>

                                            <select value={language} onChange={handleLanguageChange}>
                                                {languages.map((lang) => (
                                                    <option key={lang.code} value={lang.code}>
                                                        {lang.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button onClick={translateText} className="bg-blue-500 text-white p-1 rounded">Translate</button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className="mt-2 text-gray-500">{translation || content}</p>
                        </div>
                    </div>
                    <div className="p-5 flex space-x-4" >
                        <BlogComponent blogId={id} />
                        <Update blogId={id}></Update>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function Avatar({ name }: { name: string }) {
    return (
        <div className="flex-shrink-0">
            <span className="inline-block h-5 w-5 rounded-full overflow-hidden bg-gray-100">
                <span className="text-sm font-medium leading-none text-gray-600 pl-2">{name[0]}</span>
            </span>
        </div>
    );
}
