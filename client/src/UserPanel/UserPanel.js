import React from 'react';
import {connect} from 'react-redux';
import C from "../store/constants";
import './UserPanel.css'

const UserPanel=({
                     userPanelDate={},
                     posts=[],
                     showHint=f=>f,
                     loggingIn=f=>f,
                     exit=f=>f,
                     showRegistrationList=f=>f,
                     showAuthorizationList=f=>f,
                     loadPosts=f=>f})=>
{
    let userPanelType=()=>{
        let _login,_password;
        const submitAuthorization=(e)=>{
            e.preventDefault();
            fetch(`http://localhost:3110/?action=${C.GET_INFO_ABOUT_USER}&login=${_login.value}&password=${_password.value}`)
                .then(j=>{
                    if(j.status===404) showHint();
                    else {
                        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${C.SORT_TYPES.SORT_BY_DATE}&login=${_login.value}&password=${_password.value}`)
                            .then(j=>j.json())
                            .then(posts=>{
                                console.log('234',_login.value,_password.value);
                                loggingIn(_login.value,_password.value);
                                loadPosts(posts);
                            })
                            .catch((err)=>console.error(err));
                    }
                });
        };

        const submitRegistration=(e)=>{
            e.preventDefault();
            fetch(`http://localhost:3110/?action=${C.ADD_USER}&login=${_login.value}&password=${_password.value}`)
                .then(j=>{
                    if(j.status===404) showHint();
                    else {
                        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${C.SORT_TYPES.SORT_BY_DATE}&login=${_login.value}&password=${_password.value}`)
                            .then(j=>j.json())
                            .then(posts=>{
                                loggingIn(_login.value,_password.value);
                            })
                            .catch((err)=>console.error(err));
                    }
                });
        };

        const submitExit=()=>{
            console.log(posts);
            exit();
            loadPosts(posts.map((p)=>{return {...p,liked:false}}));
        };

       switch (userPanelDate.userPanelType) {
           case C.USER_PANEL_TYPES.AUTHORIZATION:
               return <form onSubmit={submitAuthorization} className='UserPanel__form'>
                           <h3 className='UserPanel__h3'>Авторизация</h3>
                           <div className='UserPanel__input-container'>
                                <input className='UserPanel__input' ref={input=>_login= input} type="text" placeholder='Логин' required  />
                           </div>
                           <div className='UserPanel__input-container'>
                                <input className='UserPanel__input' ref={input=>_password= input} type="password"  placeholder='Пароль' required/>
                           </div>
                                {userPanelDate.hint ? <span className='UserPanel__span'>Неправильнй пароль</span> : <span> </span>}
                                <button className='UserPanel__button'>ВОЙТИ</button>
                           <span className='UserPanel__span' onClick={showRegistrationList}>регистрация</span>
                      </form>;

           case C.USER_PANEL_TYPES.REGISTRATION:
               return <form onSubmit={submitRegistration} className='UserPanel__form'>
                           <h3 className='UserPanel__h3'>Регистрация</h3>
                           <div className='UserPanel__input-container'>
                               <input className='UserPanel__input' ref={input=>_login= input} type="text" placeholder='Логин' required/>
                           </div>
                           <div className='UserPanel__input-container'>
                               <input className='UserPanel__input' ref={input=>_password= input} type="password" placeholder='Пароль' required/>
                           </div>
                               {userPanelDate.hint ? <span className='UserPanel__span'>Ошибка регистрации</span> : <span> </span>}
                           <button className='UserPanel__button'>СОЗДАТЬ АККАУНТ</button>
                           <span className='UserPanel__span' onClick={showAuthorizationList}>войти</span>
                      </form>;

           case C.USER_PANEL_TYPES.LOGGED_IN:
               return <section className='UserPanel__section'>
                            <h3 className='UserPanel__h3'>{userPanelDate.login}</h3>
                            <button className='UserPanel__button' onClick={submitExit}>ВЫХОД</button>
                      </section>;

           default: return <div>error</div>
       }
    };

    return(
        <aside className='UserPanel'>
            {userPanelType()}
        </aside>
    )
};

export default connect(
    state=>({
        userPanelDate:state.userPanelDate,
        posts:state.posts
    }),
    dispatch=>({
        showHint:(()=>{
            dispatch({type:C.SHOW_HINT})
        }),
        loggingIn:((login,password,posts)=>{
            dispatch({type:C.LOGGING_IN,login,password,posts});
        }),
        exit:(()=>{
            dispatch({type:C.EXIT})
        }),
        showRegistrationList:(()=>{
            dispatch({type:C.REGISTRATION_LIST})
        }),
        showAuthorizationList:(()=>{
            dispatch({type:C.AUTHORIZATION_LIST})
        }),
        loadPosts:(posts=>{
            dispatch({type:C.LOAD_POSTS,posts})
        })
    })
)(UserPanel);