import React from 'react';
import ListComponent from './ListComponent';
import LoginComponent from './LoginComponent';

export default class UserLists extends React.Component {
    
    state = { lists: [], loading: true }

    async componentDidMount(){
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        config.headers["Authorization"] = 'Token ' + localStorage.getItem('token');

        var url = "http://localhost:8000/list/";
        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
        this.setState({lists: data, loading: false});
    }

    render(){

        const listApi = this.state.lists;
        var token = localStorage.getItem('token');

        if (!token) {
            return <LoginComponent />
        }
        else {
            return (
                <div>
                    {listApi.map(list => <ListComponent key={list.id} listName={list.name} items={list.item_set} />)}
                </div>
            )
        }
    }
}