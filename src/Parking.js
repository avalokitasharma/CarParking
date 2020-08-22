import React from 'react';
import { parkedCarDetail, defaultDate } from './util.js';
import Modal from 'react-modal';
import './Parking.css';

Modal.setAppElement(document.getElementById('root'));

class Parking extends React.Component {
	state = {
		totalSlots:0,
		parkedCars:0,
		cars:[],
		collection:0,
		showModal:false,
		addCarRegNo:'',
		addCarColor:'',
		search:false,
		searchRegNo:'',
		searchColor:''
	}
	openModal = () => {
		this.setState({showModal:true});
	}
	closeModal = () => {
		this.setState({showModal:false});
	}
	afterOpenModal = () => {
    // references are now sync'd and can be accessed.
   
  	}
	renderCars() {
		return this.state.cars.map((car,index) => {
			if(car !== null){
				return (
					<tr key={car.registrationId}>
				      <th scope="row">{index+1}</th>
				      <td>{car.registrationId}</td>
				      <td>{car.color}</td>
				      <td>{car.slotNo}</td>
				      <td>{car.time}</td>
				      <td><button onClick={() => this.removeCar(car)} type="button" className="btn btn-warning">Remove</button></td>
				    </tr>
				);
			}
		});
	}

	renderSearch() {
		let {searchRegNo,searchColor} = this.state;
		return this.state.cars.map((car,index) => {
			if(car !== null){
				if((searchRegNo !=='' && (car.registrationId === searchRegNo || car.registrationId.indexOf(searchRegNo) >= 0))|| car.color.toLowerCase() === searchColor.toLowerCase()){
					return (
						<tr key={car.registrationId}>
						  <th scope="row">{index+1}</th>
					      <td>{car.registrationId}</td>
					      <td>{car.color}</td>
					      <td>{car.slotNo}</td>
					      <td>{car.time}</td>
					      <td><button onClick={() => this.removeCar(car)} type="button" className="btn btn-warning">Remove</button></td>
					    </tr>
					);
				}
			}
		});
	}
	parkCar = () => {
		if(this.state.cars.length < this.state.totalSlots){
			let time = defaultDate();
			let carDetails = [...this.state.cars];
			const slot = carDetails.map(item => item).indexOf(null);
			
			let parkingCar = {
				registrationId:this.state.addCarRegNo.toUpperCase(),
				color:this.state.addCarColor,
				time:time,
				slotNo:(slot === -1)?(this.state.cars.length + 1):slot+1
			};
			if(slot !== -1){
				carDetails[slot] = parkingCar;
			} else {
				carDetails.push(parkingCar);
			}
			this.setState({
				cars:carDetails,
				showModal:false,
				parkedCars:this.state.parkedCars + 1
			});
		} else {
			alert("Parking lot is full!!Please wait for sometime :)");
		}
	}
	removeCar = (car) => {
		let carDetails = [...this.state.cars];
		let index = carDetails.findIndex(each => (each !== null) && each.registrationId === car.registrationId);
		carDetails[index] = null;
		this.setState({
			cars:carDetails,
			collection: this.state.collection + 20,
			parkedCars:this.state.parkedCars - 1
		});
	}
	componentDidMount() {
		this.setState({
			cars:parkedCarDetail(this.props.parkedCars),
			parkedCars:this.props.parkedCars,
			totalSlots:this.props.totalSlots
		});
	}

	render() {			
		const customStyles = {
		  content : {
		    top                   : '50%',
		    left                  : '50%',
		    right                 : 'auto',
		    bottom                : 'auto',
		    marginRight           : '-50%',
		    transform             : 'translate(-50%, -50%)',
		    zIndex				  : '1',
		    width				  : '450px'
		  }
		};
		return (
			<div>
				<div className="container-fluid">
					<div className="querybar">
						<div className="querybar__info">
							<p>Total parking slots - {this.state.totalSlots}</p>
							<p>Available parking slots - {this.state.totalSlots - this.state.parkedCars}</p>
							<p>Total collection - {this.state.collection}</p>

						</div>
						<div className="querybar__buttons">
							<button disabled={this.state.totalSlots === this.state.parkedCars} onClick={() => this.openModal()} type="button" className="btn btn-info">
							  Park a car
							</button>
							 <Modal
						          isOpen={this.state.showModal}
						          onAfterOpen={() => this.afterOpenModal()}
						          onRequestClose={() => this.closeModal()}
						          style={customStyles}
						          contentLabel="Park a car"
					        >
					          	<p>Enter Car Details</p>
						        <form className="form">
		  							<div className="form-group">
									    <input onChange={e => this.setState({addCarRegNo:e.target.value})} type="text" className="form-control" placeholder="Type Reg No."/>
									</div>
									<div className="form-group">
										<input onChange={ e => this.setState({addCarColor:e.target.value})}type="text" className="form-control" placeholder="Enter color"/>
									</div>
									<button onClick={() => this.closeModal()} type="button" className="btn btn-secondary btn-right">Close</button>
									<button onClick={() => this.parkCar()} type="button" className="btn btn-info btn-right">Add</button>
								</form>
					        </Modal>
						</div>
					</div>
					<div className="querybar__search clearfix">
						<form className="form-inline">
  							<div className="form-group">
							    <div className="col-sm-10">
							      <input type="text" value={this.state.searchRegNo} onChange={e => this.setState({searchRegNo:e.target.value })} className="form-control" placeholder="Type Reg No."/>
							    </div>
						  	</div>
						  	<div className="form-group">
						    	<div className="col-sm-10">
									<input type="text" value={this.state.searchColor} onChange={e => this.setState({searchColor:e.target.value })} className="form-control" placeholder="Enter color"/>
						    	</div>
						  	</div>
						  	<button onClick={() => this.setState({search:true})} type="button" className="btn btn-info">Search</button>
						  	<button onClick={e => this.setState({search:false,searchRegNo:'',searchColor:''})}  type="button" className="btn btn-secondary">Reset</button>
						</form>
					</div>
				</div>
				
				<div className="container-fluid parking">
					<table className="table">
					  <thead>
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">Car No</th>
					      <th scope="col">Color</th>
					      <th scope="col">Slot No</th>
					      <th scope="col">Date time</th>
					      <th scope="col"></th>
					    </tr>
					  </thead>
					  <tbody>
					    {this.state.search?this.renderSearch():this.renderCars()}
					  </tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Parking;





















