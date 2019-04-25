import {createStore} from 'redux'
import stateData from './initialState'

const storeFactory = (initialState=stateData)=>
    createStore(posts,initialState);

export default storeFactory;