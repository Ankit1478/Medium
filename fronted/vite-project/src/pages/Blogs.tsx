import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { Fullblog } from '../components/FullBlog';
import { BlogComponent } from './Delete';

export const Blogs = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blogs } = useBlog({ id: id || "" });

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Fullblog blog={blogs} />
            <BlogComponent blogId={id} />
        </div>
    );
};

export default Blogs;
