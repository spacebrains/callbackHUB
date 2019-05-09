import C from './constants'
//import fetch from 'isomorphic-fetch'

export const posts = (state={},action) =>{
    console.log(state,action);
  switch (action.type) {
      case C.LOAD_POSTS:
          return {...state,posts:action.posts};
      case C.SORT:
          return {...state, sort:action.by};
      default:
          return state;
  }
};
