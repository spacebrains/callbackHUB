import React from 'react';
import {connect} from 'react-redux';
import C from "../store/constants";
import './UserPanel.css'

const UserPanel=({userPanelDate={},showHint=f=>f,loggingIn=f=>f,exit=f=>f,showRegistrationList=f=>f,showAuthorizationList=f=>f})=> {

    let userPanelType=()=>{
        let _login,_password;
        const submitAuthorization=(e)=>{
            e.preventDefault();
            fetch(`http://localhost:3110/?action=${C.GET_INFO_ABOUT_USER}&login=${_login.value}&password=${_password.value}`)
                .then(j=>j.status===404 ? showHint() : loggingIn(_login.value,_password.value));
        };
        const submitRegistration=(e)=>{
            e.preventDefault();
            fetch(`http://localhost:3110/?action=${C.ADD_USER}&login=${_login.value}&password=${_password.value}`)
                .then(j=>j.status===404 ? showHint() : loggingIn(_login.value,_password.value));
        };
       switch (userPanelDate.userPanelType) {
           case C.USER_PANEL_TYPES.AUTHORIZATION:
               return <form onSubmit={submitAuthorization} className='UserPanel__form'>
                           <h3 className='UserPanel__h3'>Авторизация</h3>
                           <input className='UserPanel__input' ref={input=>_login= input} type="text" placeholder='Логин' required  />
                           <input className='UserPanel__input' ref={input=>_password= input} type="password"  placeholder='Пароль' required/>
                            {userPanelDate.hint ? <span className='UserPanel__span'>Неправильнй пароль</span> : <span> </span>}
                           <button className='UserPanel__button'>ВОЙТИ</button>
                           <span className='UserPanel__span' onClick={showRegistrationList}>регистрация</span>
                      </form>;
           case C.USER_PANEL_TYPES.REGISTRATION:
               return <form onSubmit={submitRegistration} className='UserPanel__form'>
                           <h3 className='UserPanel__h3'>Регистрация</h3>
                           <input className='UserPanel__input' ref={input=>_login= input} type="text" placeholder='Логин' required/>
                           <input className='UserPanel__input' ref={input=>_password= input} type="password" placeholder='Пароль' required/>
                            {userPanelDate.hint ? <span className='UserPanel__span'>Ошибка регистрации</span> : <span> </span>}
                           <button className='UserPanel__button'>СОЗАДАТЬ АККАУНТ</button>
                           <span className='UserPanel__span'>onClick={showAuthorizationList}>войти</span>
                      </form>;
           case C.USER_PANEL_TYPES.LOGGED_IN:
               return <section >
                            <h3 className='UserPanel__h3'>{userPanelDate.login}</h3>
                            <button className='UserPanel__button' onClick={exit}>ВЫХОД</button>
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
        userPanelDate:state.userPanelDate
    }),
    dispatch=>({
        showHint:(()=>{
            dispatch({type:C.SHOW_HINT})
        }),
        loggingIn:((login,password)=>{
            dispatch({type:C.LOGGING_IN,login,password,userPanelType:C.LOGGED_IN})
        }),
        exit:(()=>{
            dispatch({type:C.EXIT})
        }),
        showRegistrationList:(()=>{
            dispatch({type:C.REGISTRATION_LIST})
        }),
        showAuthorizationList:(()=>{
            dispatch({type:C.AUTHORIZATION_LIST})
        })

    })
)(UserPanel);