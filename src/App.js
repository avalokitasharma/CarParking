import React from 'react';
import Parking from './Parking.js';
import './App.css';

class App extends React.Component {
	state = {
		totalSlots:0,
		parkedCars:0,
		showInitForm: true
	}
	init = () => {
		this.setState({showInitForm:false})
	}
	render() {
		return (
			<div>
				<div className="container-fluid header">
					<h4>Automated Parking Lot System</h4>
				</div>
				{ this.state.showInitForm && (
					<form className="form init-form">
					<div className="form-group">
				    <input onChange={e => this.setState({totalSlots:e.target.value})} type="text" className="form-control" placeholder="Enter total parking slots"/>
					</div>
					<div className="form-group">
						<input onChange={ e => this.setState({parkedCars:e.target.value})}type="text" className="form-control" placeholder="Enter occupied parking slots"/>
					</div>
					<button onClick={() => this.init()} type="button" className="btn btn-info btn-right">Initialize...</button>
				</form>)
				}
				{ !this.state.showInitForm && (<Parking totalSlots={this.state.totalSlots} parkedCars={this.state.parkedCars}/>)}
			</div>
		);
	}
}

export default App;





















