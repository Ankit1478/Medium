import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBlogs } from '../hooks/DeletePost';

interface BlogProps {
    blogId: string;
    authorId: string;
}

export const BlogComponent: React.FC<BlogProps> = ({ blogId, authorId }) => {
    const navigate = useNavigate();
    const authOID = localStorage.getItem("authoId");
    console.log(authOID);
    console.log(authorId)

    const handleDelete = async () => {

        try {
            const res = await deleteBlogs(blogId, navigate);
            if (res) {
                alert("Successfully blog deleted");
                navigate('/');
            }
            else {
                alert("UnAuthorized Request");
            }
        } catch (error) {
            alert("Failed to delete the blog");
        }
    };

    return (
        authorId && authOID === authorId ? (
            <div>
                <button
                    onClick={handleDelete}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete Blog
                </button>
            </div>
        ) : null
    );
};

export default BlogComponent;