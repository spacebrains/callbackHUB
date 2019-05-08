import React from 'react';
import {connect} from "react-redux";
import C from "../store/constants";
import './SortPosts.css'

const SortPosts=({sortBy=f=>f})=>{
    return(
        <section className='SortPosts'>
            <span>Сортировка по: </span>
            <label className='SortPosts__sort-type'>
                <input
                    type="radio"
                    name="sort"
                    onClick={sortBy}
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
                    onClick={sortBy}
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
    }),
    dispatch=>({
        sortBy:(e=>{
            dispatch({type:C.SORT,by:e.target.value})
        })
    })
)(SortPosts);