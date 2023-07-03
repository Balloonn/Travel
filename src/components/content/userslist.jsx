import React, { Component } from 'react';
import $ from 'jquery'

class Userslist extends Component{
    constructor(){
        super()
        this.state = {
            users:[
                    {
                        userid:1,
                        password:1,
                        number:1,
                        usertpye:'用户',
                        idcard:1,
                        userstate:'normal',
                    },
                    {
                        userid:2,
                        password:2,
                        number:2,
                        usertpye:'商家',
                        idcard:2,
                        userstate:'band',
                    },
                    {
                        userid:3,
                        password:3,
                        number:3,
                        usertpye:'管理员',
                        idcard:3,
                        userstate:'normal',
                    },
            ]
        }   
        this.init()
    }

    init () {
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/userslist/',
            type: 'post',
            data: {
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){
                    console.log(resp.users)
                    this.setState({ orders:resp.users })
                } else {
                    console.log('a')
                }
            }
        })
    }

    //当有商品时显示商品
    render(){
        const {users} = this.state
        return <div>
                <table border='1' width="800px" align="center">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>用户ID</th>
                            <th>用户密码</th>
                            <th>联系方式</th>
                            <th>用户类型</th>
                            <th>身份证号</th>
                            <th>用户状态</th>
                        </tr>    
                    </thead>
                    <tbody align="center">
                        {users.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.userid}</td>
                                    <td>{item.password}</td>
                                    <td>{item.number}</td>    
                                    <td>{item.idcard}</td>   
                                    <td>{item.usertpye}</td>  
                                    <td>{item.userstate}</td>   
                                    <td><button onClick={()=>this.bandusers(index)}>封禁</button></td>
                                    <td><button onClick={()=>this.freeusers(index)}>解封</button></td>
                                </tr>
                            )
                        })}
                    </tbody>    
                </table>    
            </div>
    }
}

export default Userslist;
