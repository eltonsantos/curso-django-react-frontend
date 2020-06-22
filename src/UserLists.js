import React from 'react';
import ListComponent from './ListComponent';

export default class UserLists extends React.Component {
    
    state = { list: null, loading: true }

    async componentDidMount(){
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        config.headers["Authorization"] = 'Token fbc49a4bd6b0d54abb01c9310b1212ff3021f21a'

        var url = "http://localhost:8000/list/";
        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
        this.setState({lists: data, loading: false});
    }

    render(){
        return (
            <div>
                <ListComponent listName={"Minha Lista"} />
                <ListComponent listName={"Minha Lista 2"} />
            </div>
        )
    }
}