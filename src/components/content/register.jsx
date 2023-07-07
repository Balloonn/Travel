import React, { Component } from 'react';
import $ from 'jquery';


class Register extends Component {
    state = { 
        erro_message: '',
        username: '',
        password: '',
        password_confirm: '',
        usertype: '1',
        phonenumber: '',
        // code: '',    
        // right_code: '',
    }; 

    handleClick = e => {
        e.preventDefault();

        if(this.state.username === ''){
            this.setState({erro_message: '用户名不能为空'});
        } else if(this.state.password === ''){
            this.setState({erro_message: '密码不能为空'},);
        } else if(this.state.password !== this.state.password_confirm){
            this.setState({erro_message: '两次输入的密码不一致'},);
        // } else if(this.state.code !== this.state.right_code){
        //     this.setState({erro_message: '验证码有误'},);
        }else {
            $.ajax({
                url: 'https://app5636.acapp.acwing.com.cn/home/register/',
                type: 'post',
                data: {
                    username: this.state.username,
                    password: this.state.password,
                    usertype: this.state.usertype,
                    phonenumber: this.state.phonenumber,
                },
                dataType: 'json',
                success: resp => {
                    if(resp.result === 'successed'){
                        window.location.href = '/home';
                        console.log('success')
                    } else {
                        this.setState({error_message: '用户名已经注册'});
                    }
                }
            })
            // window.location.href = '/home';
        }
    }

    // code = e =>{
    //     e.preventDefault();
    //     if(this.state.phonenumber === ''){
    //         this.setState({erro_message: '手机号不能为空'},);
    //     }else if(this.state.phonenumber.length !== 11){
    //         this.setState({erro_message: '手机号有误'},);
    //     } else {
    //         $.ajax({
    //             url: 'https://app5636.acapp.acwing.com.cn/register/',
    //             type: 'post',
    //             data: {
    //                 phonenumber: this.state.phonenumber,
    //             },
    //             dataType: 'json',
    //             success: resp => {
    //                 if(resp.result === 'successed'){
    //                     this.setState({right_code: resp.code})
    //                     console.log(this.state.right_code)
    //                 } else {
    //                     this.setState({error_message: '请稍后再试'});
    //                 }
    //             }
    //         })
    //     }
    // }

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
                            <div className="mb-3">
                                <label htmlFor="password_confirm" className="form-label">确认密码</label>
                                <input onChange={e => {this.setState({password_confirm: e.target.value})}} type="password" className="form-control" id="password_confirm" />
                            </div>
                            <select id="select" className="form-select" aria-label="Default select example" defaultValue={"1"} onChange={e => {this.setState({usertype: e.target.value})}}>
                                <option value="1">我是游客</option>
                                <option value="2">我是商家</option>
                            </select>
                            {/* <div className="mb-3">
                                <label htmlFor="phonenumber" className="form-label">手机号</label>
                                <input onChange={e => {this.setState({phonenumber: e.target.value})}} type="text" className="form-control" id="phonenumber" />
                            </div>
                            <button onClick={this.code} style={{width: "100%"}} type="submit" className="btn btn-primary">发送验证码</button>
                            <div className="mb-3">
                                <label htmlFor="code" className="form-label">验证码</label>
                                <input onChange={e => {this.setState({code: e.target.value})}} type="text" className="form-control" id="code" />
                            </div> */}
                            <div style = {{height: "2rem", color: "red"}}>
                                {this.state.erro_message}
                            </div>
                            <button onClick={this.handleClick} style={{width: "100%"}} type="submit" className="btn btn-primary">注册</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Register;