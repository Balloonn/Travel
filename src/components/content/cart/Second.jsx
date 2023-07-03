import React, { Component } from 'react'
 
export default class Second extends Component {
    handleChange=()=>{
        this.props.onCheckStatus(this.props.item.id)
 
    }
    childReduce=()=>{
        this.props.reduce(this.props.item.id)
    }
    childAdd=()=>{
        console.log(this.props.item)
        this.props.add(this.props.item.id)
    }
    render() {
        return (
            <tr key={this.props.item.id}>
                {/* 是否勾选 */}
                <td>
                    <input type="checkbox" checked={this.props.item.isChecked ? 'checked' : ''} onChange={this.handleChange} data-id={this.props.item.id} />
                    {/* 显示的名称 */}
                </td>
                <td><span>{this.props.item.name}</span></td>
                {/* 显示的价格 */}
                <td><span>￥{this.props.item.price}</span></td>
                {/* -按钮 */}
                <td>
                    <button onClick={this.childReduce} 
                    data-id={this.props.item.id}
                    disabled={this.props.item.count===0?true:false}>-</button>
                    {/* 显示数量 */}
                    <input type="text" value={this.props.item.count} disabled />
                    {/* +按钮 */}
                    <button onClick={this.childAdd} data-id={this.props.item.id}>+</button></td>
            </tr>
 
        )
    }
}