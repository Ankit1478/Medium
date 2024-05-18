import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks'; // Import the Blog type
import { Fullblog } from '../components/FullBlog';
import { Spinner } from '../components/Spiner';

export const Blogs = () => {
    const { id } = useParams();
    const { loading, blogs } = useBlog({ id: id || "" });

    if (loading || !blogs) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div>

            <div>
                <Fullblog blog={blogs}></Fullblog>
            </div>
        </div>
    );
};

