import {createStore, combineReducers} from 'redux'
import stateData from './initialState'
import {posts,sort,userPanelDate,addPostPanel} from './reducer'
const storeFactory = (initialState=stateData())=>
    createStore(combineReducers({posts,sort,userPanelDate,addPostPanel}),initialState);

export default storeFactory;