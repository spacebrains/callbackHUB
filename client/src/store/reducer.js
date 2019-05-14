import C from './constants'
//import fetch from 'isomorphic-fetch'

export const posts = (state=[],action) =>{
  switch (action.type) {
      case C.LOAD_POSTS:
          return [...action.posts];
      case C.RESET_POSTS:
      case C.LIKE:
          return state.map(p=>p.IDP===action.IDP ? {...p,liked:true,likes:(p.likes+1)} : {...p});
      case C.DELETE_LIKE:
          return state.map(p=> p.IDP===action.IDP ? {...p,liked:false,likes:p.likes-1} : {...p});
      case C.SAVE:
          return state.map(p=>p.IDP===action.IDP ? {...p,saved:true,saves:(p.saves+1)} : {...p});
      case C.DELETE_SAVE:
          return state.map(p=> p.IDP===action.IDP ? {...p,saved:false,saves:p.saves-1} : {...p});
      case C.COMMENTS_SHOWN:
          return state.map(p=>p.IDP===action.IDP ? {...p,show_comments:true, comments:action.comments, comments_l:action.comments.length}:{...p});
      case C.COMMENTS_HIDDEN:
          return state.map(p=>p.IDP===action.IDP ? {...p,show_comments:false}:{...p});
      default:
          return state;
  }
};

export const addPostPanel=(state='false', action)=>{
    console.log(state,action);
    switch (action.type) {
        case C.ADD_POST_PANEL:
            return action.show;
        default: return state;
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
            localStorage.setItem('login',action.login);
            localStorage.setItem('password',action.password);
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


