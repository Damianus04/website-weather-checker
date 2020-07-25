window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  //   console.log(temperatureSpan.textContent);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //   console.log(position);
      //   long = 115.22;
      //   lat = -8.65;

      long = position.coords.longitude;
      lat = position.coords.latitude;

      //   const proxy = "https://cors-anywhere.herokuapp.com/";
      //   const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c10ce26d6adf6c7a838888f795aa2f8a`;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c10ce26d6adf6c7a838888f795aa2f8a`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const { temp, feels_like } = data.main;
          const { description, icon } = data.weather[0];
          //   const iconImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          //Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;
          //   FORMULA FOR CELCIUS
          let celsius = (temp - 32) * (5 / 9);

          //Set Icon
          //   setIcons(iconImage, document.querySelector(".icon"));
          //   const iconContent = document.getElementById("icon").src;
          const iconContent = document.getElementById("icon");
          console.log(iconContent);
          iconContent.setAttribute(
            "src",
            `https://openweathermap.org//img/wn/${icon}@2x.png`
          );

          //Change Fahrenheit to Celcius
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});

// Sources for openwethermap icon
// https://openweathermap.org/weather-conditions
// set icon uses set attribute to change the link on src
//
//
// using darksky icon
// https://github.com/darkskyapp/skycons
// fetch(api)
// .then((response) => {
//   return response.json();
// })
// .then((data) => {
//   console.log(data);
//   const { temp, feels_like } = data.main;
//   const { description } = data.weather[0];
//   const icon = "partly cloudy day"; // fake icon http://openweathermap.org/img/wn/10d@2x.png

//   //Set DOM Elements from the API
//   temperatureDegree.textContent = temp;
//   temperatureDescription.textContent = description;
//   locationTimezone.textContent = data.name;
//   //   FORMULA FOR CELCIUS
//   let celsius = (temp - 32) * (5 / 9);

//   //Set Icon
//   setIcons(icon, document.querySelector(".icon"));

//   //Change Fahrenheit to Celcius
//   temperatureSection.addEventListener("click", () => {
//     if (temperatureSpan.textContent === "F") {
//       temperatureSpan.textContent = "C";
//       temperatureDegree.textContent = Math.floor(celsius);
//     } else {
//       temperatureSpan.textContent = "F";
//       temperatureDegree.textContent = temp;
//     }
//   });
// });
// function setIcons(icon, iconClass) {
//     const skycons = new Skycons({ color: "white" });
//     const currentIcon = icon.replace(/ /g, "_").toUpperCase();
//     skycons.play();
//     return skycons.set(iconClass, Skycons[currentIcon]);
//   }
// });
