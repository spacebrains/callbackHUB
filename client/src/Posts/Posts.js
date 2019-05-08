import React from 'react';
import {connect} from 'react-redux';
import SortPosts from '../SortPosts/SortPosts'
import './Posts.css'

const Posts=({posts=[]})=>{
    return(
        <section className='Posts'>
            <SortPosts/>
            <ul >
                {posts.map((p)=>
                    <li key={p.IDP} className='Posts__post'>
                        <div className='Posts__likes'>
                            <div className={p.liked ?'Posts__like-icon Posts__like-icon_liked' : 'Posts__like-icon'}> </div>
                            {p.likes}
                        </div>
                        <section className='Posts__block '>
                            <header className='Posts__header'>
                                <h2 className='Posts__h'>{p.header}</h2>
                                <span className='Posts__category'>{p.category}</span>
                            </header>
                            <article className='Posts__text'>
                                {p.text}
                            </article>
                            <footer className='Posts__footer'>
                                <span className='Posts__saves'>saves: {p.saves}</span>
                                <div className='Posts__footer_right-block'>
                                    <span className='Posts__author'>{p.author}</span>
                                    <span className='Posts__date'>{p.date}</span>
                                </div>
                            </footer>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
};

export default connect(
    state=>({
        posts:state.posts
    }),
    dispatch=>({

    })
)(Posts);