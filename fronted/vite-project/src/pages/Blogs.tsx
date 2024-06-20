import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
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
            <Fullblog {...blogs}></Fullblog>;

        </div>
    );
};

