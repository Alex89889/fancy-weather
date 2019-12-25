const city = document.getElementById('city');
const date = document.getElementById('date');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const todayDegree = document.getElementById('today-degree');
const felsLike = document.getElementById('fels-like');
const wind = document.getElementById('wind');
const humanuty = document.getElementById('humanuty');
const description = document.getElementById('weath-des');

const day1 = document.getElementById('day1');
const day2 = document.getElementById('day2');
const day3 = document.getElementById('day3');

const degree1 = document.getElementById('degree1');
const degree2 = document.getElementById('degree2');
const degree3 = document.getElementById('degree3');
const cloud1 = document.getElementById('cloud1');
const cloud2 = document.getElementById('cloud2');
const cloud3 = document.getElementById('cloud3');



 class fancyWeather{
	constructor() {
		this.locationKey ='d4df50232abc3b';
		this.wheatherKey = '1adbf577d135a90f6e0f1bda840b4fed';
		this.geoKey = '9c1bb431bffb49c298bdcd834613f01f';
	}

  static init() {
    fancyWeather.getNewDate();
	fancyWeather.getMap();
  }
  
   async getWeather(){
	const weatherURL =
	"https://api.openweathermap.org/data/2.5/forecast?q=Minsk,BY&lang=ru&units=metric&APPID=1adbf577d135a90f6e0f1bda840b4fed"
	let response = await fetch(weatherURL);
	let data = await response.json();
	let dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"));
	
	localStorage.setItem('current-weather', dailyData[0].weather[0].main);
	
	todayDegree.innerHTML = dailyData[0].main.temp;
	felsLike.innerHTML = dailyData[0].main.feels_like;
	wind.innerHTML = dailyData[0].wind.speed;
	humanuty.innerHTML = dailyData[0].main.humidity;
	description.innerHTML = dailyData[0].weather[0].main;
	
	degree1.innerHTML = dailyData[1].main.temp;
	degree2.innerHTML = dailyData[2].main.temp;
	degree3.innerHTML = dailyData[3].main.temp;
	let date1 = new Date(dailyData[1].dt_txt); 
	let date2 = new Date(dailyData[2].dt_txt); 
	let date3 = new Date(dailyData[3].dt_txt); 
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	day1.innerHTML = days[date1.getDay()];
	day2.innerHTML = days[date2.getDay()];
	day3.innerHTML = days[date3.getDay()];
	cloud.classList.add(`img-${dailyData[0].weather[0].icon}`);
	cloud1.classList.add(`img-${dailyData[1].weather[0].icon}`);
	cloud2.classList.add(`img-${dailyData[2].weather[0].icon}`);
	cloud3.classList.add(`img-${dailyData[3].weather[0].icon}`);

 }
 
 async findWeather(){
	const searchInput = document.getElementById('search-input').value; 
	const weatherURL =
	`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&lang=ru&units=metric&APPID=1adbf577d135a90f6e0f1bda840b4fed`;
	let response = await fetch(weatherURL);
	let data = await response.json();
	let dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
	
	
	todayDegree.innerHTML = dailyData[0].main.temp;
	felsLike.innerHTML = dailyData[0].main.feels_like;
	wind.innerHTML = dailyData[0].wind.speed;
	humanuty.innerHTML = dailyData[0].main.humidity;
	
	degree1.innerHTML = dailyData[1].main.temp;
	degree2.innerHTML = dailyData[2].main.temp;
	degree3.innerHTML = dailyData[3].main.temp;
	let date1 = new Date(dailyData[1].dt_txt); 
	let date2 = new Date(dailyData[2].dt_txt); 
	let date3 = new Date(dailyData[3].dt_txt); 
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	day1.innerHTML = days[date1.getDay()];
	day2.innerHTML = days[date2.getDay()];
	day3.innerHTML = days[date3.getDay()];
	cloud.classList.add(`img-${dailyData[0].weather[0].icon}`);
	cloud1.classList.add(`img-${dailyData[1].weather[0].icon}`);
	cloud2.classList.add(`img-${dailyData[2].weather[0].icon}`);
	cloud3.classList.add(`img-${dailyData[3].weather[0].icon}`);
 }
  
  static getNewDate( ){
	 let date1 = new Date();

	var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	var month =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const formatDate = date => ('0'+date.getHours()).slice(-2) + ':' + ('0'+date.getMinutes()).slice(-2) + ':' + ('0'+date.getSeconds()).slice(-2);
	date.innerHTML = `${formatDate(new Date())}, ${days[date1.getDay()]} ${date1.getDate()} ${month[date1.getMonth()]}`;
   }

   async  getLocation(){
	const url = `https://ipinfo.io?token=${this.locationKey}`;
      const requestURL = await fetch(url)
        .then((res) => res.json())
        .then((data) => data);  
	let loc = requestURL.loc;
	let arrLoc = loc.split(",");
	let currentContry = requestURL.country == 'BY' ? 'Belarus' : requestURL.country;
	city.innerHTML = `${requestURL.city}, ${currentContry}`;
	
	let degreeLat = Math.floor(Number(arrLoc[0]));
	let minuteLat = Math.round(Number(Math.abs((arrLoc[0] % 1) * 60)));
	let degreeLon = Math.floor(Number(arrLoc[1]));
	let minuteLon = Math.round(Number(Math.abs((arrLoc[1] % 1) * 60)));
	degreeLon.toFixed();
	latitude.innerHTML = `${degreeLat}° ${minuteLat}′`;
	longitude.innerHTML = `${degreeLon}° ${minuteLon}′`;
	
	
	localStorage.setItem('latitude', arrLoc[0]);
	localStorage.setItem('longitude', arrLoc[1]);
  }
  
  async  findLocation(){
	const searchInput = document.getElementById('search-input').value; 
	  
	const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchInput}&key=${this.geoKey}&pretty=1&no_annotations=1`;
      const requestURL = await fetch(url)
        .then((res) => res.json())
        .then((data) => data)
		.catch(err => {
			console.log('Error: ', err)
		});
	

	let loc = requestURL.results[0].geometry;
	city.innerHTML = requestURL.results[0].formatted;
	
	const urlTime = `http://api.timezonedb.com/v2.1/get-time-zone?key=3IYSID9V9T9M&format=json&by=position&lat=${loc.lat}&lng=${loc.lng}`;
      const requestTime = await fetch(urlTime)
        .then((res) => res.json())
        .then((data) => data);
		
	let date1 = new Date(requestTime.formatted);
	date.innerHTML = `${date1}`;
   	
	let degreeLat = Math.floor(Number(loc.lat));
	let minuteLat = Math.round(Number(Math.abs((loc.lat % 1) * 60)));
	let degreeLon = Math.floor(Number(loc.lng));
	let minuteLon = Math.round(Number(Math.abs((loc.lng % 1) * 60)));
	degreeLon.toFixed();
	latitude.innerHTML = `${degreeLat}° ${minuteLat}′`;

	localStorage.setItem('latitude', loc.lat);
	localStorage.setItem('longitude', loc.lng);

	fancyWeather.getMap();
  }
  
  static getMap(){
	const removeElements = (elms) => elms.forEach(el => el.remove());
	removeElements( document.querySelectorAll(".ymaps-2-1-75-map"));
	
	ymaps.ready(init);
        function init(){
            let myMap = new ymaps.Map("map", {
                center: [localStorage.getItem('latitude'), localStorage.getItem('longitude')],
                zoom: 7
            });
        }
  }
	
}