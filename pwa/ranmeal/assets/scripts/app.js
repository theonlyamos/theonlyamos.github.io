

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () {
      console.log('Service Worker Registered');
    });
}

const getMeal = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
      const meal = res.meals[0];

      let bg = document.getElementById('background');
      let thumbnail = document.getElementById('card-img');
      let title = document.getElementById('card-title');
      let instructs = document.getElementById('meal-instructions');

      title.innerHTML = meal['strMeal'] + '<hr>';

      bg.style.backgroundImage = `url(${meal['strMealThumb']})`;
      bg.style.backgroundPosition = "center";
      bg.style.backgroundRepeat = "no-repeat";
      bg.style.backgroundSize = "cover";

      thumbnail.src = meal['strMealThumb'];
      instructs.innerText = meal['strInstructions'];

    })
    .catch(e => {
      console.warn(e);
    });
};

getMeal();

document.getElementById("fab").addEventListener("click", () => {
  getMeal();
})