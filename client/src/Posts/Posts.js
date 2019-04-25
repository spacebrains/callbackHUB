import React from 'react';
import {connect} from "react-redux";

const Posts=({posts=[]})=>{
    return(
        <section>
            {posts.map(post=>(
                <div key={post.IDP}>
                    <header>{post.header}</header>
                    <span>{post.category}</span>
                    <p>{post.text}</p>
                    <span>{post.likes}</span>
                    <span>{post.save}</span>
                    <span>{post.author}</span>
                </div>
            ))}
            <button>просмотреть больше</button>
        </section>
    )
};

export default connect(
    state=>({
        posts:state
    }),
    dispatch=>({

    })
)(Posts);