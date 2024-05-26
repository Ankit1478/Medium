import { BlogComponent } from '../pages/Delete';
import { Update } from '../pages/EditButton';
import { Appbar } from './AppBar';

interface Blog {
    author: {
        name: string;
    };
    content: string;
    id: string;
    title: string;
}

export const Fullblog = ({ author, id, content, title }: Blog) => {
    console.log(author.name);
    return (
        <div>
            <Appbar />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="max-w-5xl w-full bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                    <div className="md:flex">
                        <div className="p-6 md:p-8">
                            <div>
                                <h1 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">
                                    {title}
                                </h1>
                                <br />
                                <div className="flex items-center tracking-wide text-m text-gray-500 font-semibold">
                                    <Avatar name={author.name.toUpperCase()} /> &nbsp; &nbsp;by {author.name}
                                </div>
                            </div>
                            <p className="mt-2 text-gray-500">{content}</p>
                        </div>
                    </div>
                    <div className="p-5 flex space-x-4" >
                        <BlogComponent blogId={id} />
                        <Update blogId={id}></Update>
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
