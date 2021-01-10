import React, {useState} from 'react';

import './login.css';
import {postCall } from './FetchHandlers';

const Login = (props) => {
	
	const [userName, setUserName] = useState('');
	const [userPword, setUserPword] = useState('');
	const [createAcct, setCreateAcct] = useState();
	
    const loginHandler = async (event) => {
		event.preventDefault();
        let s = {
            "userName": userName,
            "userPword": userPword,
        };	

		try {
			const token = await postCall(s,'http://localhost:8081/user/login','','TRUE');
			console.log(token);
			console.log("token == " + token);
			props.setToken(token['token']);
			
		} catch (error) {
			console.log(error);
		}
	}
	
	const createAcctHandler = async (event) => {
		event.preventDefault();
        let s = {
            "userName": userName,
            "userPword": userPword,
        };	

		console.log(s);
		try {
			const token = await postCall(s,'http://localhost:8081/user/createuser','TRUE');
			console.log(token);
			props.setToken(token);
		} catch (error) {
			console.log(error);
		}
	
	}
	
	const handleClick = () => {
		setCreateAcct("true");
	}
	
	if (createAcct) {
		return (
			<div className="login-wrapper">
				<p> create account </p>
			    <form onSubmit = {createAcctHandler}>
			      <label>
			        <p>Username</p>
			        <input type="text" onChange={e => setUserName(e.target.value)} />
			      </label>
			      <label>
			        <p>Password</p>
			        <input type="password" onChange={e => setUserPword(e.target.value)} />
			      </label>
			      <div>
			        <button type="submit">Submit</button>
			      </div>
			    </form>
			</div>
		)
	}
	
	
	return (
		<div className="login-wrapper">
			<p> Please login or create new account </p>
		    <form onSubmit = {loginHandler}>
		      <label>
		        <p>Username</p>
		        <input type="text" onChange={e => setUserName(e.target.value)} />
		      </label>
		      <label>
		        <p>Password</p>
		        <input type="password" onChange={e => setUserPword(e.target.value)} />
		      </label>
		      <div>
		        <button type="submit">Submit</button>
		      </div>
		    </form>
			<div >
				<label>
					<p> Need to create an account?</p>
					<button onClick={handleClick}>Create Account</button>
				</label>
			</div>
		</div>
	)
}

export default Login;