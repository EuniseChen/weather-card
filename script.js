var content = document.querySelector('.content')

fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D')
  .then(function (response) {
    return response.json()
  })
  .then(function (weather) {
    var location = weather.records.location
    for (let i = 0; i < location.length; i++) {
      // 降雨幾率<= 30%， 晴天（太陽圖）；30% <降雨幾率<= 60%，陰天（雲圖）；>60%, 雨天（雨圖）
      if (location[i].weatherElement[1].time[0].parameter.parameterName <= 30) {
        var sun = './images/sunny.png'
        content.innerHTML +=
          `
          <div class="card  animate__animated animate__zoomIn">
            <div class="location-container">
              <h1 class="location">${location[i].locationName}</h1>
            </div>
            <div class="info">
              <img src="${sun}" alt="" class="sun">
              <div class="weather">${location[i].weatherElement[0].time[0].parameter.parameterName}</div>
              <div class="temperature">${location[i].weatherElement[2].time[0].parameter.parameterName}~${location[0].weatherElement[4].time[0].parameter.parameterName}℃</div>
            </div>
              <div class="sense">${location[i].weatherElement[3].time[0].parameter.parameterName}</div>
        </div>
        `
      } else if (location[i].weatherElement[1].time[0].parameter.parameterName <= 30) {
        var cloud1 = './images/cloud1.png'
        var cloud2 = './images/cloud2.png'
        content.innerHTML +=
          `
          <div class="card animate__animated animate__zoomIn">
            <div class="location-container">
              <h1 class="location">${location[i].locationName}</h1>
            </div>
            <div class="info">
              <img src="${cloud1}" alt="" class="cloud1">
              <img src="${cloud2}" alt="" class="cloud2">
              <div class="weather">${location[i].weatherElement[0].time[0].parameter.parameterName}</div>
              <div class="temperature">${location[i].weatherElement[2].time[0].parameter.parameterName}~${location[0].weatherElement[4].time[0].parameter.parameterName}℃</div>
            </div>
              <div class="sense">${location[i].weatherElement[3].time[0].parameter.parameterName}</div>
        </div>
        `
      } else {
        var rainBottom = './images/rain.png'
        var cloudTop = './images/darkcloud.png'
        content.innerHTML +=
          `
          <div class="card animate__animated animate__zoomIn">
            <div class="location-container">
              <h1 class="location">${location[i].locationName}</h1>
            </div>
            <div class="info">
              <img src="${rainBottom}" alt="" class="rain">
              <img src="${cloudTop}" alt="" class="darkcloud">
              <div class="weather">${location[i].weatherElement[0].time[0].parameter.parameterName}</div>
              <div class="temperature">${location[i].weatherElement[2].time[0].parameter.parameterName}~${location[0].weatherElement[4].time[0].parameter.parameterName}℃</div>
            </div>
              <div class="sense">${location[i].weatherElement[3].time[0].parameter.parameterName}</div>
        </div>
        `
      }
    }
    var spin = document.querySelectorAll('.sun');
    var rainDrop = document.querySelectorAll('.rain');
    var cloudBack = document.querySelectorAll('.cloud-back');
    var cloudFront = document.querySelectorAll('.cloud-front');

    for (let i = 0; i < spin.length; i++) {
      spin[i].classList.add('spin')
    }

    for (let i = 0; i < rainDrop.length; i++) {
      rainDrop[i].classList.add('raindrop')
    }

    for (let i = 0; i < cloudBack.length; i++) {
      cloudBack[i].classList.add('cloud-right')
    }

    for (let i = 0; i < cloudFront.length; i++) {
      cloudFront[i].classList.add('cloud-left')
    }
  })
