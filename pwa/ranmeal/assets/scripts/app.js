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
      let ingredients = document.getElementById('meal-ingredients');
      let instructs = document.getElementById('meal-instructions');
      let measurements = document.getElementById('meal-measurements');

      title.innerHTML = meal['strMeal'] + '<hr>';

      bg.style.backgroundImage = `url(${meal['strMealThumb']})`;
      bg.style.backgroundPosition = "center";
      bg.style.backgroundRepeat = "no-repeat";
      bg.style.backgroundSize = "cover";

      thumbnail.src = meal['strMealThumb'];
      instructs.innerHTML = meal['strInstructions'];

      let ingreds = '';
      let measures = '';

      for (var i = 1; i < 19; i++) {
        ingreds += meal[`strIngredient${i}`] + ",";
        measures += meal[`strMeasure${i}`] + ",";
      }

      ingredients.innerHTML = ingreds;
      measurements.innerText = measures;

    })
    .catch(e => {
      console.warn(e);
    });
};

getMeal();

document.getElementById("fab").addEventListener("click", () => {
  getMeal();
})

document.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === 'strong') {
    if (e.target.parentNode.parentNode.nextElementSibling.classList.contains("hide")) {
      e.target.parentNode.parentNode.nextElementSibling.classList.remove("hide");
      e.target.parentNode.parentNode.nextElementSibling.classList.add("show");
    } 
     else {
      e.target.parentNode.parentNode.nextElementSibling.classList.remove("show");
      e.target.parentNode.parentNode.nextElementSibling.classList.add("hide");
    }
  }
})