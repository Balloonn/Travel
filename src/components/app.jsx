import React, { Children, Component } from 'react';
import Navbar from './navBar';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './content/home';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notFound';
import Orderlist from './content/orderlist';
import Shoppingcart from './content/shoppingcart';
import Userslist from './content/userslist';
import $ from 'jquery';

class App extends Component {
    state = { 
        is_login: true,
        // is_login: false,
        is_administrator: true,
        username: 'Luochuyuan',
    } 

    componentDidMount() {
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/app/',
            type: 'post',
            dataType: 'json',
            success: resp => {
                if(resp.result === 'login'){
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    })
                } else {
                    this.setState({
                        is_login: false,
                    });
                }
            }
        })
    }

    render() { 
        return (
            <React.Fragment>
                <Navbar is_login={this.state.is_login} username={this.state.username} is_administrator = {this.state.is_administrator}/>
                <div className='container'>
                    <Routes>
                        <Route path='/home' element={<Home/>}/>
                        <Route path='/orderlist' element={this.state.is_login ? <Orderlist/> : <Navigate replace to="/login"/>}/>           
                        <Route path='/shoppingcart' element={this.state.is_login ? <Shoppingcart/> : <Navigate replace to="/login"/>}/>  
                        <Route path='/userslist' element={this.state.is_administrator ? <Userslist/> : <Navigate replace to="/login"/>}/>
                        <Route path='/login' element={this.state.is_login ? <Navigate replace to="/home"/> : <Login/>}/>
                        <Route path='/register' element={this.state.is_login ? <Navigate replace to="/home"/> : <Register/>}/>
                        <Route path='/404' element={<NotFound/>}/>
                        <Route path='*' element={<Navigate replace to="/404"/>}/>
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;