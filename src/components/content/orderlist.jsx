import { event } from 'jquery';
import React, { Component } from 'react';
import $ from 'jquery'

class Orderlist extends Component{

    constructor(){
        super()
        this.state = {
            search:'',
            orders:[
                    {
                        order_id:1,
                        userid:1,
                        scenicid:1,
                        order_date:'2023-7-2',
                        order_amount:85.00,
                        reserve_date:'2023-7-3',
                    },
                    {
                        order_id:2,
                        userid:1,
                        scenicid:2,
                        order_date:'2023-7-4',
                        order_amount:100.00,
                        reserve_date:'2023-7-5',
                    },
                    {
                        order_id:3,
                        userid:1,
                        scenicid:1,
                        order_date:'2023-7-2',
                        order_amount:110.00,
                        reserve_date:'2023-7-3',
                    },
            ],
            returnorders:[
                {
                    order_id:3,
                    userid:1,
                    scenicid:1,
                    order_date:'2023-7-2',
                    order_amount:110.00,
                    reserve_date:'2023-7-3',
                },
            ]
        }   
    }


    searchorder = e => {
        e.preventDefault();
        console.log(this.state.search)
        // this.setState({ orders:this.state.returnorders })
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/orderlist/',
            type: 'post',
            data: {
                search: this.state.search,
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){
                    console.log(resp.orderlist)
                    this.setState({ orders:resp.orderlist })
                } else {
                    console.log('a')
                }
            }
        })
    }

    //当有商品时显示商品
    render(){
        const {orders} = this.state
        return <div>        
                <input onChange={e => {this.setState({search: e.target.value})}} type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                <button onClick={this.searchorder} style={{width: "100%"}} type="submit" className="btn btn-primary">查询</button>
                <table border='1' width="800px" align="center">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>订单编号</th>
                            <th>景区ID</th>
                            <th>创建时间</th>
                            <th>订单金额</th>
                            <th>预约时间</th>
                        </tr>    
                    </thead>
                    <tbody align="center">
                        {orders.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.order_id}</td>
                                    <td>{item.scenicid}</td>
                                    <td>{item.order_date}</td>
                                    <td>{"￥" + item.order_amount}</td>
                                    <td>{item.reserve_date}</td>
                                    <td><button onClick={()=>this.removeItem(index)}>评价</button></td>
                                </tr>
                            )
                        })} 
                    </tbody>    
                </table>    
            </div>
    }
}

export default Orderlist;
