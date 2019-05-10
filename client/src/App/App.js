import React, {Component} from 'react';
import Header from '../Header/Header'
import Posts from '../Posts/Posts'
import UserPanel from '../UserPanel/UserPanel'
import './App.css';

class App extends Component {
    render(){
        return(
            <div className='App'>
                <Header/>
                <main className='App__main'>
                    <Posts/>
                    <UserPanel/>
                </main>
            </div>
        )
    }
}

export default App
