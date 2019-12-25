

const revert = document.getElementById('revert');
const search = document.getElementById('search');

document.addEventListener('DOMContentLoaded', () => {
  const fancyWeath = new fancyWeather();
  fancyWeath.getLocation();
  fancyWeath.getWeather();
  fancyWeather.init();
  
  const background = new Background();
  background.loadImage();
});

revert.addEventListener('click', () => {
  const background = new Background();
  background.loadImage();
});

search.addEventListener('click', () => {
	const searchInput = document.getElementById('search-input').value; 
	if(searchInput){
		const fancyWeath = new fancyWeather();
		fancyWeath.findLocation();
		fancyWeath.findWeather();
	}
});