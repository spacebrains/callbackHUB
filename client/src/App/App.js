import React, {Component} from 'react';
import Header from '../Header/Header'
import Posts from '../Posts/Posts'
import './App.css';

class App extends Component {
    render(){
        return(
            <div>
                <Header/>
                <Posts/>
            </div>
        )
    }
}

export default App
