import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

export async function deleteBlogs(blogId: number, navigate: ReturnType<typeof useNavigate>): Promise<string> {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/signin");
        return 'User not signed in'; // It's good practice to return after a navigate to prevent further execution
    }
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blogId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data.message;
    } catch (error) {
        console.error('Error deleting the blog:', error);
        return 'Failed to delete the blog';
    }
}