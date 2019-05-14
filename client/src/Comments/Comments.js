import React from 'react';
import {connect} from 'react-redux';
import C from "../store/constants";
import './Comments.css'

const Comments=({IDP='',getComments=f=>f,login='',password='',show_comments=f=>f})=>{
    const comments=getComments(IDP);
    let _text;
    const addComments=(e)=>{
        e.preventDefault();
        fetch(`http://localhost:3110/?action=${C.ADD_COMMENT}&IDP=${IDP}&text=${_text.value}&login=${login}&password=${password}`)
            .then(j=>j.json())
            .then((comments)=>{
                _text.value="";
                show_comments(IDP,comments);
            })
            .catch((err)=>console.error(err));
    };
    return (
        <section className='Comments'>
            <ul className='Comments__ul'>
                {
                    comments.map((c=>
                        <li key={c.IDPC} className='Comments__ul__li'>
                            <h4 className='Comments__ul__li__h4'>{c.login}</h4>
                            <p className='Comments__ul__li__p'>{c.text}</p>
                            <span className='Comments__ul__li__datetime'>{c.datetime}</span>
                        </li>
                    ))
                }
            </ul>
            {
                (login && password) ?
                    <form onSubmit={addComments} className='Comments__form'>
                        <div className='Comments__form__input-container'>
                            <input type="text" className='Comments__form__input' ref={input=>_text=input} required/>
                        </div>
                        <button className='Comments__form__button'>Отправить</button>
                    </form> :
                    ''
            }

        </section>
    )
};

export default connect(
    state=>({
        login:state.userPanelDate.login,
        password:state.userPanelDate.password,
        getComments:((IDP)=>{
          return state.posts.filter((p)=>p.IDP===IDP)[0].comments;
        })
    }),
    dispatch=>({
        addComment:(comment=>{
            dispatch({type:C.ADD_COMMENT,comment})
        }),
        show_comments:((IDP,comments)=>{
            dispatch({type:C.COMMENTS_SHOWN,IDP,comments})
        })
    })
)(Comments);