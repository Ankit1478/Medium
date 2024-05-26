import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



export interface Blog {
    "content": string,
    "title": string
    "id": string,
    "author": {
        "name": string
    }
}


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token") || '',
            },
        })
            .then(response => {
                setBlogs(response.data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch blogs:", error);
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blogs,
    };
};
export const useBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/getall`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs
    };
}


export async function deleteBlog(blogId: string) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/signin");
    }
    const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/delete/${blogId}`,
        {
            headers: {
                Authorization: token,
            },
        }
    );
    return response.data.message;
}

