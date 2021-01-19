
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
//import CallTestPage from './components/CallTestPage';
import ListByCustomId from './components/ListByCustomId';
import ListByObjectType from './components/ListByObjectType';
import AddCustomObject from './components/AddCustomObject';
import CustomStaticExample from './components/TestDialogs';
import './main.css';

function App() {


	const [token, setToken] = useState(sessionStorage.getItem("localToken") || '');	

	
	useEffect ( () => {
		console.log("use effect");
		console.log(token);
		sessionStorage.setItem("localToken",token);

	}, [token]);

	if (!token) {
		return <Login setToken = {setToken}/>
	};
	
	
	return (
		<>
			<div className="header">
			  <h2>Header</h2>
			</div>
			
			<div className="row">
			  <div className="column-side" style={{backgroundColor: "#aaa"}}>
				<p><a style={{marginLeft: '10%'}} href="/customid">Custom ID</a></p>
				<p><a style={{marginLeft: '10%'}} href="/objecttype">Object Type</a></p>
				<p><a style={{marginLeft: '10%'}} href="/addcustomobject">Add Custom Object</a></p>		  
				<p><a style={{marginLeft: '10%'}} href="/testdialog">Test page</a></p>		  
  
			</div>
			  
			  <div className="column-middle" style={{backgroundColor: "#bbb"}}>
	      			<BrowserRouter>
        				<Switch>
          					<Route path="/customid">
								<ListByCustomId setToken = {setToken} token = {token}/>
							</Route>	
							<Route path="/objecttype">
								<ListByObjectType 
								setToken = {setToken} 
								token = {token} />
							</Route>
							<Route path="/addcustomobject">
								<AddCustomObject setToken = {setToken} token = {token}/>
							</Route>
							<Route path="/testdialog">
								<CustomStaticExample setToken = {setToken} token = {token}/>
							</Route>						
						</Switch>
					</BrowserRouter>
			  </div>
			  <div className="column-side" style={{backgroundColor: "#ccc"}}>Column</div>
			</div>
			
			<div className="footer">
			  <p>Footer</p>
			</div>
		
		</>
	);

}

export default App;
