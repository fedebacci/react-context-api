import { Link } from "react-router-dom";



import PostsList from "../../components/posts/PostsList";
import PostsTable from "../../components/posts/PostsTable";




import { usePosts } from "../../contexts/PostsContext";









export default function PostsPage () {


    const { posts, deletePost } = usePosts();



    return (
        <main>
            <div className="container my-3">


                {/* <div className="row g-3">
                    <div className="col-12">
                        <h2 className="text-center">
                            Posts
                        </h2>
                    </div>

                    <PostsList posts={posts} />
                </div> */}


                <div className="row g-3">
                    <div className="col-12">
                        <h2 className="text-center">
                            Posts
                        </h2>

                        <Link to="/posts/create" className="btn btn-primary mb-3">
                            Crea nuovo post
                        </Link>

                        <PostsTable
                            posts={posts}
                            handleDelete={deletePost}
                        />

                        {/* <PostsList
                            posts={posts}
                        /> */}
                    </div>
                </div>
            </div>
        </main>
    );
};