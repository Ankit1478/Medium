import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlog, useBlogs } from "../hooks";


export const Blog = () => {
    const { loading, blogs } = useBlogs();
    const publishedDateString = new Date(Date.now()).toLocaleDateString("en-US");

    if (loading) return <div>Loading.......</div>;

    return (
        <div>
            <Appbar />
            <div className="space-y-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
                {blogs.map(blog => (
                    <BlogCard
                        key={blog.id} // Assuming 'id' is the correct unique identifier
                        id={blog.id}
                        name={blog.author.name || "Anonymous"} // Assuming 'authorName' is the correct property
                        title={blog.title || "Untitled"} // Assuming 'title' is the correct property
                        content={blog.content || "No content available."} // Assuming 'content' is the correct property
                        publishedDate={publishedDateString}
                    />
                ))}
            </div>
        </div>
    );
}