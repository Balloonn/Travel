import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery'

class Navbar extends Component {
    state = {  } 

    handleClick = () => {
        // $.ajax({
        //     url: 'http://localhost:3000/calculator/logout/',
        //     type: 'get',
        //     success: resp => {
        //         if(resp.result === 'success'){
        //             window.location.href = '/home';
        //         }
        //     }
        // })
    }

    render_orderlist = () => {
        if(this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/orderlist">订单</Link>
                </li>
            );
        } else{
            return '';
        }
    }

    render_shoppingcart = () => {
        if(this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/shoppingcart">购物车</Link>
                </li>
            );
        } else{
            return '';
        }
    }

    render_userlist = () => {
        if(this.props.is_administrator) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/userslist">用户列表</Link>
                </li>
            );
        } else{
            return '';
        }
    }

    render_user = () => {
        if(this.props.is_login){
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="navbar-brand" style={{cursor: "pointer"}}>{this.props.username}</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={this.handleClick} className="navbar-brand" style={{cursor: "pointer"}}>退出</a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/login">登录</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">注册</Link>
                    </li>
                </ul>
            )
        }
    }

    render() { 
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/home">旅游自助网站</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/home">首页</Link>
                            </li>
                            {this.render_orderlist()}
                            {this.render_shoppingcart()}
                            {this.render_userlist()}
                        </ul>
                        {this.render_user()}
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;