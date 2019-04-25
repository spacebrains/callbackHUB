import {createStore} from 'redux'
import stateData from './initialState'
import {posts} from './reducer'
const storeFactory = (initialState=stateData)=>
    createStore(posts,initialState);

export default storeFactory;