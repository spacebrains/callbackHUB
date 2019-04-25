import React, {Component} from 'react';
import {connect} from 'react-redux'
import Header from '../Header/Header'
import Posts from '../Posts/Posts'
import './App.css';

class App extends Component {
    componentDidMount() {

    }

    render(){
        return(
            <div>
                <Header/>
                <Posts/>
            </div>
        )
    }
}

export default connect(
    state=>({
        state:state
    }),
    dispatch=>({
        onLoadPost(){
            dispatch({type:'LOAD_POSTS',})
        }
    })
)(App)
