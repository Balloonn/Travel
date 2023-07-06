import React, { Children, Component } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './content/navBar.jsx'
import Login from './content/login.jsx';
import Home from './content/Home.jsx';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: false,
        usertype: '', // 1个人，2企业，3管理
        username: 'wzn',
        loc: '',
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        let user = searchParams.get('username');
        let st = searchParams.get('is_login');
        if(user !== null) {
            this.setState({username: user})
        }
        if(st !== null) {
            this.setState({is_login: st == 1})
        }
    }

    render() {

        return (
            <React.Fragment>
                
                <Navbar is_login={this.state.is_login} usertype={this.state.usertype} username={this.state.username}/>

                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/home' element={<Home/>}/>
                        <Route path='/home/login' element={this.state.is_login ? <Navigate replace to="/home"/> : <Login/>}/>
                    </Routes>
                </div>

            </React.Fragment>
        );
    }

}
 
export default App;