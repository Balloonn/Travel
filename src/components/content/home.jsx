import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery';

class Home extends Component {
    state = { 
        items:[
            {id:1, title:"朝阳公园"},
            {id:2, title:"天坛"},
            {id:3, title:"长城"},
            {id:4, title:"天安门广场"},
            {id:5, title:"故宫"},
        ]
    } 

    constructor() {
        super()
        this.init()
    }

    init () {
        $.ajax({
            url: 'https://app5636.acapp.acwing.com.cn/home/',
            type: 'post',
            data: {
                operation: 'init',
            },
            dataType: 'json',
            success: resp => {
                if(resp.result === 'successed'){
                    this.setState({items:resp.items})
                } else {
                    alert(resp.result)
                }
            }
        })
    }

    render() { 
        return (
            <React.Fragment>
                {this.state.items.map(item=>(
                    <div key={item.id}>
                        <div className="card" style={{width: "18rem",float:'left',marginLeft:'40px',marginTop:'40px'}}>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">简介</p>
                                <Link to={`/home/item?title=${item.title}&id=${item.id}`} >预定</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}
 
export default Home;