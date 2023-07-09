import React, { Children, Component } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './navBar.jsx'
import Login from './content/login.jsx';
import Home from './content/Home.jsx';
import Register from './content/register.jsx';
import NotFound from './content/NotFound.jsx';
import Item from './content/Item.jsx';
import Orderlist from './content/orderlist.jsx';
import Userslist from './content/userlist.jsx';
import Shoppingcart from './content/shoppingcart.jsx';
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
                        <Route path='/home/item' element={<Item is_login={this.state.is_login} username={this.state.username}/>}/>
                        <Route path='/home/login' element={this.state.is_login ? <Navigate replace to="/home"/> : <Login/>}/>
                        <Route path='/home/register' element={this.state.is_login ? <Navigate replace to="/home"/> : <Register/>}/>
                        <Route path='/home/orderlist' element={this.state.is_login ? <Orderlist username={this.state.username}/> : <Navigate replace to="/home/login"/>}/>
                        <Route path='/home/userslist' element={this.state.is_login ? <Userslist/> : <Navigate replace to="/home/login"/>}/>
                        <Route path='/home/shoppingcart' element={this.state.is_login ? <Shoppingcart/> : <Navigate replace to="/home/login"/>}/>  
                        <Route path='/404' element={<NotFound/>}/>
                        <Route path='*' element={<Navigate replace to="/404"/>}/>
                    </Routes>
                </div>

            </React.Fragment>
        );
    }

}
 
export default App;