import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBlogs } from '../hooks/DeletePost';

interface BlogProps {
    blogId: string;
    authorId: string;
}

export const BlogComponent: React.FC<BlogProps> = ({ blogId }) => {
    const navigate = useNavigate();
    const authOID = localStorage.getItem("user");
    const autid = localStorage.getItem("authoId");

    const handleDelete = async () => {

        if (authOID !== autid) {
            alert("You are not authorized to delete this blog");
            return;
        }
        console.log(blogId)
        const result = await deleteBlogs(blogId, navigate);

        if (result === 'Successfully deleted blog') {
            navigate('/');
        }
        else alert("You are not Authorized")
    };

    return (
        <div>
            {autid && (
                <button
                    onClick={handleDelete}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete Blog
                </button>
            )}
        </div>
    );
};
