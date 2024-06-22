import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface BlogProps {
    blogId: string;
}

interface Post {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    };
}

export const Update: React.FC<BlogProps> = ({ blogId }) => {
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`);
                const authorName = response.data.users.author.name;
                setPost(response.data);

                const currentUserId = localStorage.getItem('name');
                setIsOwner(authorName === currentUserId);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [blogId]);

    const handleEdit = () => {
        navigate(`/update/${blogId}`);
    };

    if (!post) {
        return <div></div>;
    }

    return (
        <div>
            {isOwner && (
                <button
                    onClick={handleEdit}
                    type="button"
                    className="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                >
                    Edit
                </button>
            )}
        </div>
    );
};