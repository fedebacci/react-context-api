import PostCard from "./PostCard";
import { usePosts } from "../../contexts/PostsContext";

export default function PostsList () {
    const { posts } = usePosts();
    return (
        <div className="col-12">
            <div className="row row-cols-2 g-3">
                {
                    posts.length > 0 ?
                    posts.map(post => {
                        return(
                            <PostCard post={post}  key={post.id}/>
                        )
                    })
                    :
                    <div className="col-12">
                        <h5>
                            Nessun post da visualizzare
                        </h5>
                    </div>
                }
            </div>
        </div>
    );
};