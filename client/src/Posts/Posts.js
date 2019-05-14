import React, {Component} from 'react';
import {connect} from 'react-redux';
import SortPosts from '../SortPosts/SortPosts'
import AddPost from '../AddPost/AddPost'
import Comments from '../Comments/Comments'
import C from "../store/constants";
import './Posts.css'

class Posts extends Component{
    category; liked; saves; author; likes; IDP; value; saved; show_comments; comments_l;
    componentWillMount() {
        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${C.SORT_TYPES.SORT_BY_DATE}&login=${this.props.login}&password=${this.props.password}`)
            .then(j=>j.json())
            .then(posts=> {
                this.props.loadPosts(posts)
            })
            .catch((err)=>console.error(err));
        this.like=this.like.bind(this);
        this.deleteLike=this.deleteLike.bind(this);
        this.submitLike=this.submitLike.bind(this);
        this.save=this.save.bind(this);
        this.deleteSave=this.deleteSave.bind(this);
        this.submitSave=this.submitSave.bind(this);
        this.submitComments=this.submitComments.bind(this);
        this.loadComments=this.loadComments.bind(this);
    }

    submitLike(e){
        const IDP=e.target.parentElement.parentElement.value;
        const post = this.props.posts.filter(p=>p.IDP===IDP)[0];
        post.liked ? this.deleteLike(IDP) : this.like(IDP);
    }

    like(IDP){
        if(this.props.login!=='' && this.props.password!==''){
            fetch(`http://localhost:3110/?action=${C.LIKE}&IDP=${IDP}&login=${this.props.login}&password=${this.props.password}`)
                .then(()=>{
                    this.props.like(IDP);
                })
                .catch((err)=>console.error(err));
        }

    };

    deleteLike(IDP){
        if(this.props.login!=='' && this.props.password!==''){
            fetch(`http://localhost:3110/?action=${C.DELETE_LIKE}&IDP=${IDP}&login=${this.props.login}&password=${this.props.password}`)
                .then(()=>{
                    this.props.deleteLike(IDP);
                })
                .catch((err)=>console.error(err));
        }
    };

    submitSave(e){
        const IDP=e.target.parentElement.parentElement.parentElement.parentElement.value;
        const post = this.props.posts.filter(p=>p.IDP===IDP)[0];
        post.saved ? this.deleteSave(IDP) : this.save(IDP);
    }

    save(IDP){
        if(this.props.login!=='' && this.props.password!==''){
            fetch(`http://localhost:3110/?action=${C.SAVE}&IDP=${IDP}&login=${this.props.login}&password=${this.props.password}`)
                .then(()=>{
                    this.props.save(IDP);
                })
                .catch((err)=>console.error(err));
        }

    };

    deleteSave(IDP){
        if(this.props.login!=='' && this.props.password!==''){
            fetch(`http://localhost:3110/?action=${C.DELETE_SAVE}&IDP=${IDP}&login=${this.props.login}&password=${this.props.password}`)
                .then(()=>{
                    this.props.deleteSave(IDP);
                })
                .catch((err)=>console.error(err));
        }
    };

    submitComments(e){
        const IDP=e.target.parentElement.parentElement.parentElement.parentElement.value;
        const post = this.props.posts.filter(p=>p.IDP===IDP)[0];
        post.show_comments ? this.props.hide_comments(IDP) : this.loadComments(IDP);
    }

    loadComments(IDP){
        fetch(`http://localhost:3110/?action=${C.LOAD_COMMENTS}&IDP=${IDP}`)
            .then(j=>j.json())
            .then((comments)=>{
                this.props.show_comments(IDP,comments);
            })
            .catch((err)=>console.error(err));
    }


    render() {
        return (
            <section className='Posts'>
                <SortPosts/>
                {
                    (this.props.login && this.props.password) ?
                        <AddPost/> :
                        ''
                }
                <ul>
                    {this.props.posts.map((p) =>
                        <li key={p.IDP} className='Posts__post' value={p.IDP}>
                            <div className='Posts__likes'>
                                <div
                                    className={p.liked ? 'Posts__like-icon Posts__like-icon_liked' : 'Posts__like-icon'}
                                    onClick={this.submitLike}
                                >
                                </div>
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
                                    <div className='Posts__saves'>
                                        <div
                                            className={p.saved ? 'Posts__save-icon Posts__save-icon_saved' : 'Posts__save-icon'}
                                            onClick={this.submitSave}
                                        >
                                        </div>
                                        {p.saves}
                                    </div>
                                    <div className='Posts__comments'>
                                        <div
                                            className={p.show_comments ? 'Posts__comments-icon Posts__comments-icon_show' : 'Posts__comments-icon'}
                                            onClick={this.submitComments}
                                        >
                                        </div>
                                        {p.comments_l}
                                    </div>
                                    <div className='Posts__footer_info-block'>
                                        <span className='Posts__author'>{p.author}</span>
                                        <span className='Posts__date'>{p.date}</span>
                                    </div>
                                </footer>
                                {p.show_comments ? <Comments IDP={p.IDP}/> : ''}
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
        login:state.userPanelDate.login,
        password:state.userPanelDate.password
    }),
    dispatch=>({
        loadPosts:(posts=>{
            dispatch({type:C.LOAD_POSTS,posts})
        }),
        like:(IDP=>{
            dispatch({type:C.LIKE,IDP})
        }),
        deleteLike:(IDP=>{
            dispatch({type:C.DELETE_LIKE,IDP})
        }),
        save:(IDP=>{
            dispatch({type:C.SAVE,IDP})
        }),
        deleteSave:(IDP=>{
            dispatch({type:C.DELETE_SAVE,IDP})
        }),
        hide_comments:(IDP=>{
            dispatch({type:C.COMMENTS_HIDDEN,IDP})
        }),
        show_comments:((IDP,comments)=>{
            dispatch({type:C.COMMENTS_SHOWN,IDP,comments})
        })
    })
)(Posts);