
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import CallTestPage from './components/CallTestPage';
import ListByCustomId from './components/ListByCustomId';
import ListByObjectType from './components/ListByObjectType';
import './main.css';

function App() {

	const [token, setToken] = useState(localStorage.getItem("token"));

	if (!token) {
		return <Login setToken = {setToken}/>
	} 
	
	return (
		<>
			<div className="header">
			  <h2>Header</h2>
			</div>
			
			<div className="row">
			  <div className="column-side" style={{backgroundColor: "#aaa"}}>
				<p><a style={{marginLeft: '10%'}} href="/customid">Custom ID</a></p>
				<p><a style={{marginLeft: '10%'}} href="/objecttype">Object type</a></p>
			  </div>
			  
			  <div className="column-middle" style={{backgroundColor: "#bbb"}}>
	      			<BrowserRouter>
        				<Switch>
          					<Route path="/customid">
								<ListByCustomId setToken = {setToken} token = {token["token"]}/>
							</Route>	
							<Route path="/objecttype">
								<ListByObjectType token = {token["token"]}/>
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

/*
	return (
		<>
		<div className="main-header">
		<h2> hello there </h2>
		</div>
		<div className="outer-wrapper">
			<div className="container">
		  		<div className="item">
                    <p>Left</p>
                    <p> a </p>
                    <p> b </p>
                </div>
		  		<div className="item">
                    <p>Right</p>
                    <ListByCustomId token = {JSON.stringify(token)}/>
                </div>
			</div>
		</div>
	</>
  );
*/
}

export default App;
