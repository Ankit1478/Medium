import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { Fullblog } from '../components/FullBlog';
import { Spinner } from '../components/Spiner';


export const Blogs = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blogs } = useBlog({ id: id || "" });

    if (loading) return <div>
        <div className="w-screen h-screen flex justify-center items-center">
            <Spinner />
        </div>
    </div>;

    return (
        <div>
            <Fullblog blog={blogs}></Fullblog>
        </div>
    );
};

export default Blogs;
