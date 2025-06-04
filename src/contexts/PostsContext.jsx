import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const PostsContext = createContext();


const apiUrl = 'http://localhost:3000/posts';


function PostsProvider ({ children }) {

    // console.debug(`apiUrl in PostsProvider: ${apiUrl}`);
    
    
    const [posts, setPosts] = useState([]);
    // console.debug(`posts in PostsProvider: `, posts);
    
    useEffect(() => {
        // console.debug(`useEffect PostsProvider PARTITO`);
        axios
            .get(apiUrl)
            .then(response => {
                // console.info(response.data);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const deletePost = (id) => {
        axios
            .delete(apiUrl + '/' + id)
            .then(response => {
                console.info(response);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            });
    };



    const postsHandler = {
        posts,
        deletePost
    }

    console.debug(`postsHandler in PostsProvider`, postsHandler);

    return (
        <PostsContext.Provider value={postsHandler}>
            {children}
        </PostsContext.Provider>
    );
};



function usePosts () {
    return useContext(PostsContext);
};



export { PostsProvider, usePosts };