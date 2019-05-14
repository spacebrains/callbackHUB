import React from 'react';
import {connect} from "react-redux";
import C from "../store/constants";
import './SortPosts.css'

const SortPosts=({sort=C.SORT_TYPES.SORT_BY_DATE,sortBy=f=>f,login='',password='',loadPosts=f=>f})=>{
    const change=e=>{
        const by=e.target.value;
        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${by}&login=${login}&password=${password}`)
            .then(j=>j.json())
            .then(posts=>sortBy(by,posts))
            .catch((err)=>console.error(err));

    };

    const loadSavePosts=()=>{
        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&saves=true&login=${login}&password=${password}`)
            .then(j=>j.json())
            .then(posts=>loadPosts(posts))
            .catch((err)=>console.error(err));
    };
    return(
        <section className='SortPosts'>
            <div>
                <span>Сортировка по: </span>
                <label className='SortPosts__sort-type'>
                    <input
                        type="radio"
                        name="sort"
                        onClick={change}
                        value={C.SORT_TYPES.SORT_BY_DATE}
                        defaultChecked
                        className='SortPosts__input'
                    />
                    <span>дате</span>
                </label>
                <label className='SortPosts__sort-type'>
                    <input
                        type="radio"
                        name="sort"
                        onClick={change}
                        value={C.SORT_TYPES.SORT_BY_REIT}
                        className='SortPosts__input'
                    />
                    <span>рейтингу</span>
                </label>
            </div>
            {
                (login && password) ?
                    <label className='SortPosts__sort-type'>
                        <input
                            type="radio"
                            name="sort"
                            onClick={loadSavePosts}
                            value={C.SORT_TYPES.SORT_BY_REIT}
                            className='SortPosts__input'
                        />
                        <span>сохранённое</span>
                    </label> :
                    ''
            }

        </section>
    )
};

export default connect(
    state=>({
        sort:state.sort,
        login:state.userPanelDate.login,
        password:state.userPanelDate.password
    }),
    dispatch=>({
        sortBy:((by,posts)=>{
            dispatch({type:C.SORT,by});
            dispatch({type:C.LOAD_POSTS,posts})
        }),
        loadPosts:(posts=>{
            dispatch({type:C.LOAD_POSTS,posts})
        })
    })
)(SortPosts);