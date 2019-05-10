import React from 'react';
import {connect} from "react-redux";
import C from "../store/constants";
import './SortPosts.css'

const SortPosts=({sort=C.SORT_TYPES.SORT_BY_DATE,sortBy=f=>f})=>{
    const change=e=>{
        const by=e.target.value;
        if(sort!==by && by in C.SORT_TYPES){
            fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${by}`)
                .then(j=>j.json())
                .then(posts=>sortBy(by,posts));
        }
    };
    return(
        <section className='SortPosts'>
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
        </section>
    )
};

export default connect(
    state=>({
        sort:state.sort
    }),
    dispatch=>({
        sortBy:((by,posts)=>{
            dispatch({type:C.SORT,by});
            dispatch({type:C.LOAD_POSTS,posts})
        })
    })
)(SortPosts);