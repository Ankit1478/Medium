import { Fullblog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from 'react-router-dom';

export const Blogs = () => {
    const { id } = useParams();
    const { loading, blogs } = useBlog({
        id: id || ""
    });
    if (loading) return <div>loading............</div>
    return <div>

    </div>
}