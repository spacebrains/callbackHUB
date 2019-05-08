import React, {Component} from 'react';
import Header from '../Header/Header'
import Posts from '../Posts/Posts'
import './App.css';
import {connect} from "react-redux";
import C from "../store/constants";

class App extends Component {
    componentWillMount() {
        fetch(`http://localhost:3110/?action=${C.LOAD_POSTS}&sort=${C.SORT_TYPES.SORT_BY_DATE}`)
            .then(j=>j.json())
            .then(a=>console.log(a));
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
    }),
    dispatch=>({
    })
)(App);