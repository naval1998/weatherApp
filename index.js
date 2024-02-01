
  let APIkey = "48391eebfb038fceaa7ed4a169a0dc60";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  let main = document.getElementsByClassName("weather");
  var inputElement = document.getElementById("city");
    inputElement.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            weatherApiCall()
        }
    });

  const weatherApiCall = async () => {
    let city = document.getElementById("city").value;
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48391eebfb038fceaa7ed4a169a0dc60&cnt=5`
    );
    const res = await data.json();
    let h5 = document.getElementById("Naval");
    h5.innerText = res.name;
    console.log(res,"res")
    let ress = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&exclude=hourly,minutely&units=metric&appid=dd7fa73e412e7d4b26a84b058a427602`
    );
    let datas = await ress.json();
    console.log(datas, 'datas');
    let div = document.getElementById("temp");
      div.innerHTML = `${Math.round(datas.current.temp)}&deg;C`;
      let press = document.getElementById("pressure");
      press.innerHTML = `Pressure:${datas.current.pressure}`;
      let wind = document.getElementById("wind");
      wind.innerHTML = `wind:${datas.current.wind_speed} km/ph`;
      let humidity = document.getElementById("humidity");
      humidity.innerHTML = `Humidity:${datas.current.humidity} g.m-3`;
      let sunrise = document.getElementById("sunrise");
      const x = new Date(datas.current.sunrise* 1000);
      sunrise.innerHTML = `Sunrise:${x.toLocaleTimeString()}`
      let sunset = document.getElementById("sunset");
      const y = new Date(datas.current.sunset* 1000);
      sunset.innerHTML = `Sunset:${y.toLocaleTimeString()}`
        

    if (res.weather[0].main == "Clouds") {        
        let sunpara = document.querySelector("p");
        sunpara.innerHTML = `<i class="fa-solid fa-cloud" style="color: #2eabe0;"></i>`;
      } else if (res.weather[0].main == "Rain") {        
        let sunpara = document.querySelector("p");
        sunpara.innerHTML = `<i class="fa-solid fa-cloud-rain fa-shake" style="color: #5f88ce;"></i>`;
      } else if (res.weather[0].main == "Clear") {        
        let sunpara = document.querySelector("p");
        sunpara.innerHTML = `<i class="fa-solid fa-cloud-sun fa-fade" style="color: #4377d0;"></i>`;
      }
      

      let dt = document.getElementById("dt");
      const dd = new Date(datas.current.dt* 1000);
      dt.innerHTML = `${dd.toLocaleString()}`;
      const day = dd.getDay()
      console.log('day', day)   
      const arr = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

      let count = 0;
      let i = day + 1;
      daily.innerHTML=null;
      while (count < arr.length-1) {        
        const dailyDiv = document.getElementById('daily')       
        daily.innerHTML += `<div><h2>${arr[i]}</h2>
          <i class="fa-solid fa-cloud-sun-rain fa-beat"></i><br /><br />${datas.daily[i].temp.day}&deg;C</div>`;
        console.log('after', day)
        i = (i + 1) % arr.length;
        count++;
      }  
  };
