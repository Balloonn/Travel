import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery'

class Login extends Component {
    state = { 
        erro_message: '',
        username: '',
        password: '',
    }; 

    handleClick = e => {
        e.preventDefault();

        if(this.state.username === ''){
            this.setState({erro_message: '用户名不能为空'});
        } else if(this.state.password === ''){
            this.setState({erro_message: '密码不能为空'},);
        } else {
            console.log(this.state.username)
            console.log(this.state.password)
            $.ajax({
                url: 'https://app5636.acapp.acwing.com.cn/login/',
                type: 'post',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: 'json',
                success: resp => {
                    if(resp.result === 'successed'){
                        console.log('success')
                        window.location.href = '/orderlist';
                    } else {
                        this.setState({error_message: resp.result});
                    }
                }
            })
        }
    }

    render() { 
        console.log(this.props.is_login)
        return (
            <Base>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-sm-3">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">用户名</label>
                                    <input onChange={e => {this.setState({username: e.target.value})}} type="text" className="form-control" id="username" aria-describedby="emailHelp" />                            </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">密码</label>
                                    <input onChange={e => {this.setState({password: e.target.value})}} type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div style = {{height: "2rem", color: "red"}}>
                                    {this.state.erro_message}
                                </div>
                                <button onClick={this.handleClick} style={{width: "100%"}} type="submit" className="btn btn-primary">登录</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Base>
        );
    }
}
 
export default Login;