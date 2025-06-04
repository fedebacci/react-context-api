import { createContext, useContext, useState, useEffect } from "react";

import pages from "../assets/js/data/pages";

import axios from "axios";


const PostsContext = createContext();


const apiUrl = 'http://localhost:3000/posts';
const newPostInitialData = {
    title: "",
    image: "",
    content: "",
    tags: [],
};
const possibleTags = [
    {
        id: 1, 
        text: "Antipasti"
    },
    {
        id: 2, 
        text: "Primi piatti"
    },
    {
        id: 3, 
        text: "Dolci veloci"
    },
    {
        id: 4, 
        text: "Ricette veloci"
    },
    {
        id: 5, 
        text: "Dolci"
    },
    {
        id: 6, 
        text: "Dolci al cioccolato"
    },
    {
        id: 7, 
        text: "Ricette vegetariane"
    },
    {
        id: 8, 
        text: "Torte"
    },
    {
        id: 9, 
        text: "Ricette al forno"
    },
];







function PostsProvider ({ children }) {
    
    const [posts, setPosts] = useState([]);

    

    const fetchPosts = () => {
        axios
            .get(apiUrl)
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        fetchPosts();
    }, [])



    const deletePost = (id) => {
        axios
            .delete(apiUrl + '/' + id)
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            });
    };

    
    const createPost = (postData, handleNavigation) => {
        axios
        .post(apiUrl, postData)
        .then(response => {
            setPosts(response.data.posts);
            handleNavigation(pages.SHOWPOST(response.data.newPost.id));
        })
        .catch(error => {
            console.error(error);
        });
    };



    const postsHandler = {
        posts,
        newPostInitialData,
        possibleTags,
        fetchPosts,
        deletePost,
        createPost
    }





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