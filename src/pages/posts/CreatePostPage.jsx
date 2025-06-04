import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

import pages from "../../assets/js/data/pages";


// const apiUrl = 'http://localhost:3000/posts';


import { usePosts } from "../../contexts/PostsContext";








export default function CreatePostPage () {

    const { newPostInitialData, possibleTags, fetchPosts, createPost } = usePosts();

    const [ newPostData, setNewPostData ] =  useState({ ...newPostInitialData });
    const navigate = useNavigate();



    // todo: SI RIPETE, DECIDERE SE DICHIARARLA FUORI E PASSARLA NEI COMPONENTI
    const handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            const isChecked = e.target.checked;
            const value = e.target.value;

            if (isChecked) {
                const newTags = [ ...newPostData.tags, value ];                
                setNewPostData({ ...newPostData, tags: newTags});
            } else {
                const newTags = [ ...newPostData.tags ].filter(tag => tag != value);
                setNewPostData({ ...newPostData, tags: newTags});
            };

            return;
        };
        setNewPostData({ ...newPostData, [e.target.name]: e.target.value});
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        createPost(newPostData);
        setNewPostData({ ...newPostInitialData });
        // fetchPosts();
        // navigate(pages.SHOWPOST(response.data.newPost.id));
        navigate(pages.POSTS());




        // axios
        //     .post(apiUrl, newPostData)
        //     .then(response => {
        //         setNewPostData({ ...newPostInitialData });
        //         navigate(pages.SHOWPOST(response.data.newPost.id));
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    };





    return (
        <main>
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <Link className="btn btn-primary" to="/posts">
                            Torna alla lista
                        </Link>
                        <h2>
                            Create new Post
                        </h2>


                        <form>
                            <div className="mb-3">
                                <label htmlFor="postTitle" className="form-label">
                                    * Post title
                                </label>
                                <input 
                                    value={newPostData.title}
                                    onChange={handleInputChange}
                                    name="title"
                                    required

                                    type="text" 
                                    className="form-control" 
                                    id="postTitle" 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="postImage" className="form-label">
                                    * Post image URL
                                </label>
                                <input 
                                    value={newPostData.image}
                                    onChange={handleInputChange}
                                    name="image"
                                    required

                                    type="text" 
                                    className="form-control" 
                                    id="postImage" 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="postContent" className="form-label">
                                    * Post content
                                </label>
                                <textarea 
                                    value={newPostData.content}
                                    onChange={handleInputChange}
                                    name="content"
                                    required

                                    className="form-control" 
                                    id="postContent" 
                                    rows="5"
                                >
                                </textarea>
                            </div>



                            <div className="mb-3">

                                {
                                    possibleTags.map(tag => {
                                        return (
                                            <div className="form-check" key={tag.id}>
                                                <input 
                                                    onChange={handleInputChange}
                                                    checked={newPostData.tags.includes(tag.text)}
                                                    value={tag.text} 

                                                    id={`check-${tag.text}`} 

                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                />
                                                <label className="form-check-label" htmlFor={`check-${tag.text}`}>
                                                    {tag.text}
                                                </label>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                            <button 
                                onClick={handleSubmit}

                                type="submit" 
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};