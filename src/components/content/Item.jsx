import React, { Component } from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import $ from 'jquery';

class Item extends Component{
    state = {
        searchParams: this.props.params[0],
        setSearchParams: this.props.params[1],
        reserve_date:'',
        idnumber: '',
    }

    buy = e => {
        e.preventDefault();
        if(this.props.is_login === false){
            window.location.href = '/home/login';
        }
        else{
            $.ajax({
                url: 'https://app5636.acapp.acwing.com.cn/home/item/',
                type: 'post',
                data: {
                    username: this.props.username,
                    reserve_date: this.state.reserve_date,
                    scenicid: this.state.searchParams.get('id'),
                    idnumber: this.state.idnumber,
                },
                dataType: 'json',
                success: resp => {
                    if(resp.result === 'successed'){
                        window.location.href = '/home';
                    } else {
                        alert(resp.result)
                    }
                }
            })
        }
        
    }

    render() {
        return (
             <React.Fragment>
                <h1>{this.state.searchParams.get('title')}</h1>

                <h1>{this.state.searchParams.get('id')}</h1>
                <div>
                    <input type="date"  onChange={e => {this.setState({reserve_date: e.target.value})}} name="mouth"/>
                    <div className="mb-3">
                        <label htmlFor="idnumber" className="form-label">身份证号</label>
                        <input onChange={e => {this.setState({idnumber: e.target.value})}} type="text" className="form-control" id="idnumber" />
                    </div>
                    <br />
                    <button onClick={this.buy} style={{width: "25%", }} type="submit" className="btn btn-primary" >加入购物车</button>
                </div>
                <hr />
                <Link to='/home'>返回</Link>
             </React.Fragment>
        );
    }
}

export default (props)=>(
    <Item 
        {...props}
        params = {useSearchParams()}
    />
);
