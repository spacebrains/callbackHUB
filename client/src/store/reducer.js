import C from './constants'
//import fetch from 'isomorphic-fetch'

export const posts = (state=[],action) =>{
  switch (action.type) {
      case C.LOAD_POSTS:
          console.log(state,action);
          return state;
      default: return state;
  }
};





