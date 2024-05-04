import { Avatar } from "./BlogCard"


export const Appbar = () => {
    return <div className="border-b flex  justify-between px-10 py-4">
        <div>Medium</div>
        <div>
            <Avatars name="Ankit"></Avatars>
        </div>
    </div>
}

function Avatars({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>

    );
}

