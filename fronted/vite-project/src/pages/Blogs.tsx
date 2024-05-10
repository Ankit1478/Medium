import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { Fullblog } from '../components/FullBlog';


export const Blogs = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blogs } = useBlog({ id: id || "" });

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Fullblog blog={blogs}></Fullblog>
        </div>
    );
};

export default Blogs;
