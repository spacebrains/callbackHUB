import React, {Component} from 'react';
import {connect} from 'react-redux';
import SortPosts from '../SortPosts/SortPosts'
import C from "../store/constants";
import './Posts.css'

class Posts extends Component{
    category;
    liked;
    saves;
    author;
    likes;
    IDP;
    componentWillMount() {
        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${C.SORT_TYPES.SORT_BY_DATE}`)
            .then(j=>j.json())
            .then(posts=>this.props.loadPosts(posts));
    }

    render() {
        return (
            <section className='Posts'>
                <SortPosts/>
                <ul>
                    {this.props.posts.map((p) =>
                        <li key={p.IDP} className='Posts__post'>
                            <div className='Posts__likes'>
                                <div
                                    className={p.liked ? 'Posts__like-icon Posts__like-icon_liked' : 'Posts__like-icon'}> </div>
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
    }
}

export default connect(
    state=>({
        posts:state.posts,
    }),
    dispatch=>({
        loadPosts:posts=>{
            dispatch({type:C.LOAD_POSTS,posts})
        }
    })
)(Posts);