import React, { Component } from 'react';
import $ from 'jquery'

class Userslist extends Component{
    state = { 
        users:[
                    {
                        username:'1',
                        password:'1',
                        usertype:'1',
                        phonenumber:1,
                        state:'normal',
                    },
                    {
                        username:'2',
                        password:'2',
                        usertype:'2',
                        phonenumber:'2',
                        state:'normal',
                    },
                    {
                        username:'1',
                        password:'2',
                        usertype:'3',
                        phonenumber:'2',
                        state:'banned',
                    },
            ],
    } 

    constructor(){
        super()
        this.init()
    }

    init () {
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/userslist/',
            type: 'post',
            data: {
                operation:'init'
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){
                    console.log(resp.users)
                    this.setState({ users:resp.users })
                } else {
                    alert(resp.result)
                }
            }
        })
    }

    banfree(index) {
        let user = this.state.users
        let st = ''
        if(user[index].state === 'normal') {
            user[index].state = 'banned'
            this.setState({users: user})
            st = 'banned'
        }
        else if(user[index].state === 'banned') {
            user[index].state = 'normal'
            this.setState({users: user})
            st = 'normal'
        }
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/userslist/',
            type: 'post',
            data: {
                operation: 'banfree',
                username: user.username,
                state: st,
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){

                } else {
                    alert("操作失败")
                }
            }
        })
    }

    render(){
        const {users} = this.state
        return (
            <table className="table table-striped" id='userlist'>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">用户名</th>
                    <th scope="col">用户密码</th>
                    <th scope="col">联系方式</th>
                    <th scope="col">用户类型</th>
                    <th scope="col">用户状态</th>
                    <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.phonenumber}</td>    
                                    <td>{user.usertype}</td>
                                    <td>{user.state}</td>   
                                    <td><button onClick={()=>this.banfree(index)}>{users[index].state==='normal' ? '封禁' : '解封'}</button></td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        )
    }
}

export default Userslist;
