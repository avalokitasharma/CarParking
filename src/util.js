export const parkedCarDetail = (parked) => {
	let parkedCars = [];
	for(let i = 0; i < parked; i++){
		let car = {};
		let [regId, color, dateTime] = makeRegistrationNumber();
		car = {registrationId: regId, color: color, slotNo: i+1, time: dateTime};
		parkedCars.push(car);
	}
	return parkedCars;
}

const makeRegistrationNumber = () => {
	   let result = '';
	   const randomChars = () => {
	   	   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		   let randChars = ''
		   for ( let i = 0; i < 2; i++ ) {
		      randChars += characters.charAt(Math.floor(Math.random() * 26));
		   }
		   return randChars;
	   }
	   const randomNumbers = (len) => {
		   let numbers = '0123456789'
		   let randNum = '';
		   for ( let i = 0; i < len; i++ ) {
		      randNum += numbers.charAt(Math.floor(Math.random() * 10));
		   }
		   return randNum;
	   }
	   const randomColors = () => {
		   let colors = ['Red','Green','White','Black','Blue','Magenta','Silver','Orange', 'Gray','Tan'];
		   let randColor = colors[Math.floor(Math.random() * 10)];
		   return randColor;
	   }

	   result = `KA-${randomNumbers(2)}-${randomChars()}-${randomNumbers(4)}`;
	   
	   return [result,randomColors(),defaultDate()];
}

export const defaultDate = () => {
   	let d = new Date();
	let formattedDate = Intl.DateTimeFormat(undefined, {
	  year: 'numeric',
	  month: 'numeric',
	  day: 'numeric',
	  hour: 'numeric',
	  minute: 'numeric'
	}).format(d);

	return formattedDate; 
}