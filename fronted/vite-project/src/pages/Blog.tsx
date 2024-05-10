import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlog, useBlogs } from "../hooks";


export const Blog = () => {

    const { loading, blogs } = useBlogs();
    const publishedDateString = new Date(Date.now()).toLocaleDateString("en-US");

    if (loading) return <div>Loading.......</div>;

    return (
        <div  >
            <Appbar />

            <div className="space-y-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl ">
                {blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        name={blog.author.name || "Anonymous"}
                        title={blog.title || "Untitled"}
                        content={blog.content || "No content available."}
                        publishedDate={publishedDateString}
                    />
                ))}
            </div>
        </div>
    );
}