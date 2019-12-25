const wrapper = document.getElementById('wrapper');

class Background{
  constructor() {
    this.accessKey = 'a00ace4cbd77e7a92dd21b671128f8f06a6c39db6080b109a6cdc9acf59885df';
  }

  async loadImage() {
	let temp_date = new Date();
	let hours = temp_date.getHours();
	let am_pm, season;
	if (hours >=  6 && hours < 10) am_pm = 'morning';
	else if (hours >= 10 && hours < 18) am_pm = 'day';
	else if (hours >= 18 && hours < 22) am_pm = 'evening';
	else if (hours >= 22 || hours <  6) am_pm = 'night';
	
	let month = temp_date.getMonth()+1;
	if (month == 1 || month == 2 || month == 12) season = 'winter';
	else if (month == 3 || month == 4 || month == 5) season = 'spring';
	else if (month == 6 || month == 7 || month == 8) season = 'summer';
	else if (month == 9 || month == 10 || month == 11) season = 'autumn';
	  
	let currentWeather = localStorage.getItem('current-weather');
	
    const url = `https://api.unsplash.com/photos/random?query=${am_pm}+${season}+nature+${currentWeather}&client_id=${this.accessKey}`;
    const requestURL = await fetch(url)
      .then((res) => res.json())
      .then((data) => data.urls.small);
	wrapper.setAttribute('style', `background-image: url(${requestURL})`);
	
	}
}