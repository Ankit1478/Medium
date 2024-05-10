import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBlogs } from '../hooks/DeletePost';

interface BlogProps {
    blogId: string;
}

export const BlogComponent: React.FC<BlogProps> = ({ blogId }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const message = await deleteBlogs(blogId, navigate);
        alert(message);
    };

    return (
        <div>
            <h1>Blog Details</h1>
            <button onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Blog</button>
        </div>
    );
};