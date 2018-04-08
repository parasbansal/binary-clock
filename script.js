let binaryArrayTime = [];

setInterval(load, 1000);
setInterval(dayTimeBar, 300000);


function dayTimeBar() {
	let Hours = new Date().getHours();
	let minutes = new Date().getMinutes();
	let seconds = new Date().getSeconds();

	let secondsPassed = (Hours * 60 * 60) + (minutes * 60) + seconds;

	let dayProgressPercent = Math.floor((secondsPassed / 86400) * 100);

	let box = document.querySelector('#box');

	box.style.backgroundImage = 'linear-gradient(to right, #252525 0%, #252525 ' + dayProgressPercent + '%, #272727 ' + dayProgressPercent + '%,#272727 100%)';

}


function load() {
	let time = getTime();
	mapTimeToArray(time);
}

function mapTimeToArray(time) {

	let seperatedHours = getIndividualDigits(time.hours);
	let seperatedMinutes = getIndividualDigits(time.minutes);
	let seperatedSeconds = getIndividualDigits(time.seconds);

	binaryArrayTime[0] = convertNumberInBinaryArray(seperatedHours.x);
	binaryArrayTime[1] = convertNumberInBinaryArray(seperatedHours.y);
	binaryArrayTime[2] = convertNumberInBinaryArray(seperatedMinutes.x);
	binaryArrayTime[3] = convertNumberInBinaryArray(seperatedMinutes.y);
	binaryArrayTime[4] = convertNumberInBinaryArray(seperatedSeconds.x);
	binaryArrayTime[5] = convertNumberInBinaryArray(seperatedSeconds.y);
	binaryArrayTime[6] = [time.midday];

	mapArrayToDots();
}

function convertNumberInBinaryArray(number) {
	return number.toString(2).split('').map(Number).reverse();
}

function getIndividualDigits(number) {
	return { x: Math.floor(number / 10), y: number % 10 };
}

function mapArrayToDots() {
	resetDots();

	for (let i = 0; i < 7; i++) {
		for (let index in binaryArrayTime[i]) {
			if (binaryArrayTime[i][index]) makeDotActive(i + index);
		}
	}

}

function makeDotActive(id) {
	let element = document.querySelector('#dot' + id);
	element.classList.add('active-dot');
}

function getTime() {
	let Hours = new Date().getHours();
	let hours = Hours > 12 ? Hours - 12 : Hours;
	let minutes = new Date().getMinutes();
	let seconds = new Date().getSeconds();

	let time = {
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		midday: Hours > 11 ? 0 : 1
	}

	return time;
}

function resetDots() {
	let elements = document.querySelectorAll('.dot');
	elements.forEach(function (e, i) {
		e.classList.remove('active-dot');
	});
}

load();
dayTimeBar();

