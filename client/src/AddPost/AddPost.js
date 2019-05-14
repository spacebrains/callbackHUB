import React from 'react';
import {connect} from 'react-redux';
import C from "../store/constants";
import './AddPost.css'

const AddPost=({login='',password='',addPostPanelState=false,addPostPanel=f=>f,loadPosts=f=>f})=>{
    let _header,_text,_category;

    const addPostSwitch=()=>{
        console.log(addPostPanelState,!addPostPanelState);
        addPostPanel(!addPostPanelState);
    };

    const AddPost=(e)=>{
        e.preventDefault();
        fetch(`http://localhost:3110/?action=${C.ADD_POST}&header=${_header.value}&text=${_text.value}&category=${_category.value}&login=${login}&password=${password}`)
            .then(()=>{
                    fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${C.SORT_TYPES.SORT_BY_DATE}&login=${login}&password=${password}`)
                        .then(j=>j.json())
                        .then(posts=>{
                            loadPosts(posts);
                        })
                        .catch((err)=>console.error(err));
            })
            .catch((err)=>console.error(err));
    };

    return (
        <section className='AddPost'>
            {addPostPanelState ?
                <div className='AddPost__open'>
                    <form onSubmit={AddPost} className='AddPost__form'>
                        <section className='AddPost__form_top_section'>
                            <div className='AddPost__form__input-header-container'>
                                <input className='AddPost__form__input-header' type="text" ref={input=>_header=input} placeholder='Заголовок' required/>
                            </div>
                            <select className='AddPost__form__select' name="" id="" ref={input=>_category=input} placeholder='Категория'>
                                <option value="совет">совет</option>
                                <option value="lifehack">lifehack</option>
                                <option value="отзыв">совет</option>
                            </select>
                        </section>
                        <div className='AddPost__form__input-text-container'>
                            <input className='AddPost__form__input-text' type="text" ref={input=>_text=input} placeholder='Текст' required/>
                        </div>
                        <button className='AddPost__button'>Добавить</button>
                    </form>
                    <button className='AddPost__button' onClick={addPostSwitch}>Скрыть -</button>
                </div> :
                <button className='AddPost__button' onClick={addPostSwitch}>Добавить пост +</button>}
        </section>
    )
};

export default connect(
    state=>({
        login:state.userPanelDate.login,
        password:state.userPanelDate.password,
        addPostPanelState:state.addPostPanel
    }),
    dispatch=>({
        addPostPanel:((show)=>{
            dispatch({type:C.ADD_POST_PANEL,show})
        }),
        loadPosts:(posts=>{
            dispatch({type:C.LOAD_POSTS,posts})
        })
    })
)(AddPost);