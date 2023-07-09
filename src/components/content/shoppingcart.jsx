import React, { Component } from 'react';
import $ from 'jquery'

class Shoppingcart extends Component{

    state = {
        search_content:'',
        username:'',
        orderlist:[
            {
                order_id:'1',
                idnumber:'1',
                scenicid:'1',
                scenictitle:'1',
                reserve_date:'2023-7-3',
                order_price:85.00,
            },
            {
                order_id:'2',
                idnumber:'1',
                scenicid:'2',
                scenictitle:'2',
                reserve_date:'2023-7-5',  
                order_price:100.00,
            },
            {
                order_id:'3',
                idnumber:'1',
                scenicid:'1',
                scenictitle:'1',
                reserve_date:'2023-7-8', 
                order_price:110.00,
            },
            {
                order_id:'4',
                idnumber:'1',
                scenicid:'1',
                scenictitle:'1',
                reserve_date:'2023-7-9', 
                order_price:150.00,
            },
    ],
    }

    constructor(){
        super()
        this.init()
    }

    init () {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('username');
        this.setState({username:username})
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/shoppingcart/',
            type: 'post',
            data: {
                operation: 'init',
                username: username,
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){
                    this.setState({ orderlist:resp.orderlist })
                } else {
                    alert(resp.result)
                }
            }
        })
    }
    
    // //第三种计算总价的方法
    // totalPrice(){
    //     console.log('counting')
    //     const neworders = [...this.state.orders]
    //     let total=0
    //     neworders.forEach(item => {
    //         total +=item.ischecked ? item.order_amount*item.amount:0
    //     })
    //     this.setState({totalamount: total})
    // }

    // //删除商品
    // removeItem(index){
    //     const neworders = [...this.state.orders]
    //     $.ajax({
    //         url: 'https://app5636.acapp.acwing.com.cn/shoppingcart/',
    //         type: 'post',
    //         data: {
    //             operation: 'remove',
    //             orderlist: neworders[index].scenicid
    //         },
    //         dataType: 'json',
    //         success: resp => {
    //             if(resp.result === 'successed'){
    //                 console.log('successed')
    //             } else {
    //                 console.log('a')
    //             }
    //         }
    //     })
    //     neworders.splice(index,1)
    //     this.setState({orders:neworders})
    //     this.totalPrice()
    // }

    // buy(){
    //     console.log('a')
    //     var final = []
    //     this.state.orders.forEach(item=>{
    //         if(!item.ischecked)
    //             final.push(item)
    //     })
    //     console.log(final)
    //     this.setState({final})
    //     $.ajax({
    //         url: 'https://app5636.acapp.acwing.com.cn/shoppingcart/',
    //         type: 'post',
    //         data: {
    //             operation: 'buy',
    //             orderlist: this.state.orders
    //         },
    //         dataType: 'json',
    //         success: resp => {
    //             if(resp.result === 'successed'){
    //                 console.log('successed')
    //             } else {
    //                 console.log('a')
    //             }
    //         }
    //     })
    // }

    setChecked(st) {
        for(let i=0;i<this.state.orderlist.length;i++){
            const check = document.getElementById('check_' + i)
            check.checked = st
        }
    }

    checkAll() {
        let flag_all = true
        for(let i=0;i<this.state.orderlist.length;i++){
            const check = document.getElementById('check_' + i)
            if(check.checked === false) {
                flag_all = false
            }
        }
        const check = document.getElementById('flexCheckDefault')
        if(flag_all === false){
            check.checked = false
        }
        if(flag_all === true){
            check.checked = true
        }
    }

    delete(index) {
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/shoppingcart/',
            type: 'post',
            data: {
                operation: 'delete',
                order_id: this.state.orderlist[index].order_id,
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){

                } else {
                    alert(resp.result)
                }
            }
        })
        let orders = this.state.orderlist
        orders.splice(index, 1)
        this.setState({orderlist:orders})
    }

    render(){
        const orders = this.state.orderlist
        
        return (
            <table className="table table-striped" id='userlist'>
                <thead>
                    <tr>
                    <th scope="col" style={{width:'5px'}}>
                        <div className="form-check">
                            {/* <label class="form-check-label" for="flexCheckDefault">
                                全选
                            </label> */}
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={e=>{this.setChecked(e.target.checked)}}/>
                        </div>
                    </th>   
                    <th scope="col">订单编号</th>
                    <th scope="col">身份证号</th>
                    <th scope="col">景区编号</th>
                    <th scope="col">景区名称</th>
                    <th scope="col">预定日期</th>
                    <th scope="col">订单金额</th>
                    <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order,index)=>{
                            return (
                                <tr key={index}>
                                    <td >
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id={'check_'+index} onChange={()=>{this.checkAll()}}/>
                                        </div>
                                    </td>
                                    <td>{order.order_id}</td>
                                    <td>{order.idnumber}</td>
                                    <td>{order.scenicid}</td>
                                    <td>{order.scenictitle}</td>  
                                    <td>{order.reserve_date}</td>
                                    <td>{"￥" + order.order_price}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={()=>this.delete(index)}>删除</button></td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>       
        )
    }
}

export default Shoppingcart;
