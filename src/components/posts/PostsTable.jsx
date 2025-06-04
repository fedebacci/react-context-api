
import { usePosts } from "../../contexts/PostsContext";


import PostTableRowElement from "./PostTableRowElement";

export default function PostsTable () {

    const { posts, deletePost } = usePosts();

    return (
        posts.length > 0 ?
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        TITLE
                    </th>
                    <th>
                        TAGS
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    posts.map(post => {
                        return (
                            <PostTableRowElement 
                                id={post.id}
                                key={post.id}
                                title={post.title}
                                tags={post.tags}
                                handleDelete={deletePost}
                            />
                        )
                    })
                }
            </tbody>
        </table>
        :
        <div className="col-12">
            <h5>
                Nessun post da visualizzare
            </h5>
        </div>
    );
};