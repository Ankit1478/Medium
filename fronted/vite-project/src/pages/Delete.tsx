import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteBlogs } from '../hooks/DeletePost';
import { BACKEND_URL } from '../config';

interface BlogProps {
    blogId: string;
}

export const BlogComponent: React.FC<BlogProps> = ({ blogId }) => {
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user"); // Assuming the user ID is stored under the key "user_id"

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers: {
                        Authorization: token // Assuming a Bearer token is expected
                    }
                });
                const userId = res.data.authorId; // Adjust according to your API response structure
                if (userId === user_id) { // Direct comparison, assuming both are strings
                    setIsOwner(true);
                }
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
    }, [blogId, token, user_id]); // Added user_id as a dependency

    const handleDelete = async () => {
        try {
            await deleteBlogs(blogId, navigate);
            alert("Successfully blog deleted");
            navigate('/'); // Navigate to home or another appropriate route after deletion
        } catch (error) {
            console.error("Error:", error);
            alert("Not Authorized to Delete");
        }
    };

    return (
        !isOwner ? (
            <div>
                <button onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete Blog
                </button>
            </div>
        ) : null
    );
};
