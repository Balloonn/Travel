import React, { Component } from 'react'
import Second from './Second'
export default class Shoppingcart extends Component {
    state = {
        carts: [{
            id: 1,
            name: '足球鞋',
            price: 25,
            count: 1,
            isChecked: false
        }, {
            id: 2,
            name: '篮球鞋',
            price: 35,
            count: 1,
            isChecked: false
        }, {
            id: 3,
            name: '草鞋',
            price: 125,
            count: 1,
            isChecked: false
        }],
        // 总价
        total: 0,
        // 全选状态
        allCheckStatus: false
    }
    // 加按钮的回调函数 
    add=(id)=>{
        const {carts} = this.state
        carts.forEach(item => {
            if(id===item.id){
                item.count++
                return
            }
        });
        this.setState({carts}) //更新渲染到界面
        this.totalAdd()
    }
    //减按钮的回调函数
    reduce=(id)=>{
        const {carts} = this.state
        carts.forEach(item => {
            if(id===item.id){
                item.count--
                return
            }
        });
        this.setState({carts}) //更新渲染到界面
        this.totalAdd()
 
    }
    // 单个按钮
    onCheckStatus=(id)=>{
        const {carts} =this.state
        let sum=0
        carts.forEach(item =>{
            if(id===item.id){
                item.isChecked=!item.isChecked
            }
            sum+=item.isChecked?1:0
        })
        // 当单个按钮全部选中 全选按钮也要更新
        if(sum===3){
            this.setState({allCheckStatus:true})
        }else{
            this.setState({allCheckStatus:false})
        }
        this.setState({carts})
        this.totalAdd()
 
    }
    // 全选
    onAllCheckStatus=()=>{
        const {carts,allCheckStatus} = this.state
        carts.forEach(item =>{
            item.isChecked=!allCheckStatus
        })
        this.setState({carts,allCheckStatus:!allCheckStatus})
        this.totalAdd()
 
    }
    // 计算总额
    totalAdd=()=>{
        const {carts} = this.state
        let total=0
        carts.forEach(item=>{
            total +=item.isChecked?item.count*item.price:0
        })
        this.setState({total})
    }
    render() {
        return (
            <div>
                <table border={1}>
                    <tbody>
                    <tr>
                        <td></td>
                        <td>商品名称</td>
                        <td>单价</td>
                        <td>数量</td>
                    </tr>
 
                    {this.state.carts.map(item => {
                        return (
                            <Second key={item.id} item={item} add={this.add} 
                            reduce={this.reduce} onCheckStatus={this.onCheckStatus} />
                        )
                    })}
                    </tbody>
                </table>
                <div className="allCheck">
                    {/* 需要根据我们定义的属性来判断是否是全选 */}
                    <input type="checkbox" checked={this.state.allCheckStatus ? 'checked' : ''} onChange={this.onAllCheckStatus} />全选
                    <h1 className="total">总计：￥{this.state.total}</h1>
                </div>
            </div>
 
        )
    }
}