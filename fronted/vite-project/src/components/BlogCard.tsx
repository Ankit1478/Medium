import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    name: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    name,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    let minutes: number = Math.ceil(content.length / 100);
    let minutesString: string = minutes.toString();
    return (
        <Link to={`/blog/${id}`}>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl p-4 '>
                <div className='md:flex'>
                    <div className='p-11'>
                        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>{name}</div>
                        <a href="#" className='block mt-1 text-lg leading-tight font-medium text-black hover:underline'>{title}</a>
                        <p className='mt-2 text-gray-500'>{content.length >= 100 ? `${content.slice(0, 100)}.....` : content}</p>
                    </div>
                    <div className='flex justify-end items-center flex-grow'>
                        <div className='invisible lg:visible '>
                            <Avatar name={name.toUpperCase()} />
                            <div className='text-xs font-thin text-gray-900'>{name}</div>
                        </div>
                        <div className='ml-3 '>
                            <div className='flex space-x-1 text-sm text-gray-500 invisible lg:visible'>
                                <time dateTime={publishedDate}>{publishedDate}</time>
                            </div>
                            <div className='text-xs mt-5 font-thin invisible lg:visible'>{minutesString} min read</div>
                        </div>
                    </div>

                </div>


            </div>
        </Link>
    );
};

export function Avatar({ name }: { name: string }) {
    return (
        <div className="flex-shrink-0">
            <span className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100">
                <span className="text-sm font-medium justify-center leading-none text-gray-600 pl-2">{name[0]}</span>
            </span>
        </div>
    );
}