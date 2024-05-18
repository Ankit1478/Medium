import { BlogComponent } from '../pages/Delete';
import { Appbar } from './AppBar';
import { Blog } from '../hooks/index'


export const Fullblog = ({ blog }: { blog: Blog }) => {

    return (
        <div>
            <Appbar />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="max-w-5xl w-full bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                    <div className="md:flex">
                        <div className="p-6 md:p-8">
                            <div>
                                <h1 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">
                                    {blog.title}
                                </h1>
                                <br />
                                <div className="flex items-center tracking-wide text-m text-gray-500 font-semibold">
                                    <Avatar name={blog.author.name.toUpperCase()} /> &nbsp; &nbsp;by {blog.author.name}
                                </div>
                            </div>
                            <p className="mt-2 text-gray-500">{blog.content}</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <BlogComponent blogId={blog.id} authorId={blog.author.name} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export function Avatar({ name }: { name: string }) {
    return (
        <div className="flex-shrink-0">
            <span className="inline-block h-5 w-5 rounded-full overflow-hidden bg-gray-100">
                <span className="text-sm font-medium leading-none text-gray-600 pl-2">{name[0]}</span>
            </span>
        </div>
    );
}
