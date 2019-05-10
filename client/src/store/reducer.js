import C from './constants'
//import fetch from 'isomorphic-fetch'

export const posts = (state=[],action) =>{
  switch (action.type) {
      case C.LOAD_POSTS:
          return [...action.posts];
      default:
          return state;
  }
};

export const sort = (state=C.SORT_TYPES.SORT_BY_DATE,action) =>{
    switch (action.type) {
        case C.SORT:
            return action.by;
        default:
            return state;
    }
};

export const userPanelDate = (state={},action) =>{
    switch (action.type) {
        case C.SHOW_HINT:
            return {...state,hint:true};
        case C.LOGGING_IN:
            localStorage['login']=action.login;
            localStorage['password']=action.password;
            return {...state,login:action.login,password:action.password,userPanelType:C.USER_PANEL_TYPES.LOGGED_IN,hint:false};
        case C.EXIT:
            localStorage.removeItem('login');
            localStorage.removeItem('password');
            return {...state,login:'',password:'',userPanelType: C.USER_PANEL_TYPES.AUTHORIZATION};
        case C.REGISTRATION_LIST:
            return {...state,hint:false,userPanelType:C.USER_PANEL_TYPES.REGISTRATION};
        case C.AUTHORIZATION_LIST:
            return {...state,hint:false,userPanelType:C.USER_PANEL_TYPES.AUTHORIZATION};
        default:
            return state;
    }
};


