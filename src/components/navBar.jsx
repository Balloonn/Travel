import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery'

class Navbar extends Component {
    state = {
    }

    logout = () => {
        window.location.href = '/home?is_login=0';
    }

    render_orderlist = () => {
        if(this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to={"/home/orderlist?username=" + this.props.username}>历史订单</Link>
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
                    <Link className="nav-link" to="/home/shoppingcart">购物车</Link>
                </li>
            );
        } else{
            return '';
        }
    }

    render_userlist = () => {
        if(this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/home/userslist">用户列表</Link>
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
                        <div className="nav-link">{this.props.username}</div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/home" onClick={this.logout}>退出</Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/home/login">登录</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/home/register">注册</Link>
                    </li>
                </ul>
            )
        }
    }

    render_additem = () => {
        if(this.props.is_login) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/home/addgoods">添加商品</Link>
                </li>
            );
        } else{
            return '';
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/home">旅游网站</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {this.render_orderlist()}
                            {this.render_shoppingcart()}
                            {this.render_userlist()}
                            {this.render_additem()}
                        </ul>
                        {this.render_user()}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;