import React from 'react';
import UserLists from './UserLists';

export default class LoginComponent extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event){
        this.setState({username: event.target.value});
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        
        var url = "http://localhost:8000/api-token-auth/";

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                this.setState({ token: data.token });
            });

        event.preventDefault();
    }

    logout(){
        localStorage.removeItem('token');
        this.setState({ token: null });
    }
    
    render(){

        var token = localStorage.getItem('token');

        if (!token) {
            
            return (
                <div class="login">

                    <h2 class="login-header"><b>Lista de itens usando Django e React</b></h2>

                    <div class="login-triangle"></div>
                    
                    <h2 class="login-header">Log in</h2>
                    
                    <form onSubmit={this.handleSubmit} class="login-container">
                        <p><input type="text" value={this.state.username} onChange={this.handleChangeUsername} placeholder="Usuário" /></p>
                        <p><input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Senha" /></p>
                        <p><input type="submit" value="Log in" /></p>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div class="login">
                    <UserLists />
                    <div class="button-container">
                        <p><input onClick={() => this.logout()} type="submit" value="Logout" /></p>
                    </div>

                </div>
            )
            
        }
    }
}