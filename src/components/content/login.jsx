import React, { Component } from 'react';
import $ from 'jquery'


class Login extends Component {
    state = { 
        username: '',
        usertype: '1',
        password: '',
    }; 

    handleClick = e => {
        e.preventDefault();
        if(this.state.username === ''){
            this.setState({erro_message: '用户名不能为空'});
        } else if(this.state.password === ''){
            this.setState({erro_message: '密码不能为空'},);
        } else {
            $.ajax({
                url: 'https://app5636.acapp.acwing.com.cn/home/login/',
                type: 'post',
                data: {
                    username: this.state.username,
                    usertype: this.state.usertype,
                    password: this.state.password,
                },
                dataType: 'json',
                success: resp => {
                    if(resp.result === 'successed'){
                        window.location.href = '/home?username=' + this.state.username + '&is_login=1';
                    } else {
                        this.setState({error_message: resp.result});
                    }
                }
            })
            // window.location.href = '/home?username=' + this.state.username + '&is_login=1';
        }
    }

    render() { 
        return (
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
        );
    }
}
 
export default Login;