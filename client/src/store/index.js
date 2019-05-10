import {createStore, combineReducers} from 'redux'
import stateData from './initialState'
import {posts,sort,userPanelDate} from './reducer'
const storeFactory = (initialState=stateData())=>
    createStore(combineReducers({posts,sort,userPanelDate}),initialState);

export default storeFactory;