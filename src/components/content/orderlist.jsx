import React, { Component } from 'react';
import $ from 'jquery'

class Orderlist extends Component{
    state = {
        search_content:'',
        username:'',
        orderlist:[
            {
                order_id:'1',
                username:'1',
                scenicid:'1',
                scenictitle:'1',
                order_date:'2023-7-2',
                reserve_date:'2023-7-3',
                order_price:85.00,
                comment_content:'',
                comment_stars:'',
                comment: true,
                cancel: false,
            },
            {
                order_id:'2',
                username:'1',
                scenicid:'2',
                scenictitle:'2',
                order_date:'2023-7-4',
                reserve_date:'2023-7-5',  
                order_price:100.00,
                comment_content:'',
                comment_stars:'',
                comment: false,
                cancel: true,
            },
            {
                order_id:'3',
                username:'1',
                scenicid:'1',
                scenictitle:'1',
                order_date:'2023-7-2',
                reserve_date:'2023-7-8', 
                order_price:110.00,
                comment_content:'',
                comment_stars:'',
                comment: true,
                cancel: false,
            },
            {
                order_id:'4',
                username:'1',
                scenicid:'1',
                scenictitle:'1',
                order_date:'2023-7-2',
                reserve_date:'2023-7-9', 
                order_price:150.00,
                comment_content:'',
                comment_stars:'',
                comment: false,
                cancel: true,
            },
    ],
    }

    constructor(){
        super()
        this.changeorderindex = ''
        this.eva_contant = ''
        this.canceldate = ''
        this.init()
    }

    init () {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('username');
        this.setState({username:username})
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/orderlist/',
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
        
        // let orders = this.state.orderlist
        // const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth() + 1;
        // const day = date.getDate();
        // for(let i=0;i<orders.length;i++) {
        //     const reserve_date = orders[i].reserve_date
        //     let pos = 0
        //     let order_year = ''
        //     let order_month = ''
        //     let order_day = ''
        //     while(reserve_date[pos] !== '-'){
        //         order_year += reserve_date[pos]
        //         pos++;
        //     }
        //     pos ++;
        //     while(reserve_date[pos] !== '-'){
        //         order_month += reserve_date[pos]
        //         pos++;
        //     }
        //     pos ++;
        //     while(pos < reserve_date.length) {
        //         order_day += reserve_date[pos]
        //     }

        //     if(year >= order_year){
        //         if(month >= order_month){
        //             if(day >= order_day){
        //                 orders[i].cancel = false
        //                 orders[i].comment = true
        //             }
        //             else{
        //                 orders[i].cancel = true
        //                 orders[i].comment = false
        //             }
        //         }
        //         else{
        //             orders[i].cancel = true
        //             orders[i].comment = false
        //         }
        //     }
        //     else {
        //         orders[i].cancel = true
        //         orders[i].comment = false
        //     }
        // }
        // this.setState({orderlist:orders})
    }

    comment(index) {
        if(this.state.orderlist[index].comment === true){
            return (
                <div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#comment'+'_'+index}>
                        发表评论
                    </button>
                    <div className="modal fade" id={'comment'+'_'+index} tabindex="-1" aria-labelledby={'commentLabel'+'_'+index} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id={'commentLabel'+'_'+index}>评论</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <textarea  rows={6} onChange={e => {this.setContent(index, e.target.value)}} type="text" className="form-control" />
                                <fieldset className="rating" onChange={e => {this.setStar(index, e.target.value)}}>
                                    <input type="radio" id="star5" name="rating" value="5" />
                                    <label htmlFor="star5">5 stars</label>
                                    <input type="radio" id="star4" name="rating" value="4" />
                                    <label htmlFor="star4">4 stars</label>
                                    <input type="radio" id="star3" name="rating" value="3" />
                                    <label htmlFor="star3">3 stars</label>
                                    <input type="radio" id="star2" name="rating" value="2" />
                                    <label htmlFor="star2">2 stars</label>
                                    <input type="radio" id="star1" name="rating" value="1" />
                                    <label htmlFor="star1">1 star</label>
                                </fieldset>
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>this.comment_submit(index)}>提交</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    cancel(index) {
        if(this.state.orderlist[index].cancel === true){
            return (
                <div>
                     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#cancel'+'_'+index}>
                        取消订单
                     </button>
                     <div className="modal fade" id={'cancel'+'_'+index} tabindex="-1" aria-labelledby={"cancelLabel"+'_'+index} aria-hidden="true">
                         <div className="modal-dialog modal-dialog-centered">
                             <div className="modal-content">
                             <div className="modal-header">
                                 <h1 className="modal-title fs-5" id={"cancelLabel"+'_'+index}>取消订单</h1>
                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                             </div>
                             <div className="modal-body" style={{color:'#FF0000'}}>
                                您确定要取消订单吗？
                             </div>
                             <div className="modal-footer">
                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                                 <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>this.cancel_submit(index)}>取消订单</button>
                             </div>
                             </div>
                         </div>
                     </div>
                </div>
             )
        }
    }

    cancel_submit(index) {
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/orderlist/',
            type: 'post',
            data: {
                operation: 'cancel',
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
        orders[index].cancel = false
        this.setState({orderlist:orders})
    }

    done(index) {
        if(this.state.orderlist[index].cancel === false && this.state.orderlist[index].comment === false){
            return (
                <div>
                    <button type="button" className="btn btn-primary">
                        已完成
                     </button>
                </div>
            )
        
        }
    }

    setStar(index, star) {
        let orders = this.state.orderlist
        orders[index].comment_stars = star
        this.setState({orderlist:orders})
    }

    setContent(index, content) {
        let orders = this.state.orderlist
        orders[index].comment_content = content
        this.setState({orderlist:orders})
    }

    comment_submit(index) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const today = year + '-' + month + '-' + day
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/orderlist/',
            type: 'post',
            data: {
                operation: 'comment',
                username: this.state.username,
                scenicid: this.state.orderlist[index].scenicid,
                comment_stars: this.state.orderlist[index].comment_stars,
                comment_content: this.state.orderlist[index].comment_content,
                date:today,
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
        orders[index].comment = false
        this.setState({orderlist:orders})
    }

    render(){
        const orders = this.state.orderlist
        
        return (
            <table className="table table-striped" id='userlist'>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">订单编号</th>
                    <th scope="col">景区编号</th>
                    <th scope="col">景区名称</th>
                    <th scope="col">下单日期</th>
                    <th scope="col">预定日期</th>
                    <th scope="col">订单金额</th>
                    <th scope="col">评论/取消</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order,index)=>{
                    console.log(order)
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{order.order_id}</td>
                                    <td>{order.scenicid}</td>
                                    <td>{order.scenictitle}</td>  
                                    <td>{order.order_date}</td> 
                                    <td>{order.reserve_date}</td>
                                    <td>{"￥" + order.order_price}</td>
                                    <td>
                                        {this.comment(index)}
                                        {this.cancel(index)}
                                        {this.done(index)}
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>       
        )
    }
}

export default Orderlist


