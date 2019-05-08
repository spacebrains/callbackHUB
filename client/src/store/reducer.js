import C from './constants'
//import fetch from 'isomorphic-fetch'

export const posts = (state={},action) =>{
    console.log(state,action);
  switch (action.type) {
      case C.LOAD_POSTS:
          return loadPosts();
      case C.SORT:
          return sort(state,action.by);
      default:
          return state;
  }
};

const sort = (state, by) =>{
    if(state.sort===by){
        return state;
    }
    else if(by in C.SORT_TYPES){
        state.posts=[];
        state.sort=by;
        return {...state, sort:by};
    }
    else {
        return state;
    }
};

const loadPosts = (state)=>{
    return state;
};


