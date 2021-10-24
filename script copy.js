var content = document.querySelector('.content')
var north = ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣', '新竹市', '宜蘭縣']
var middle = ['苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '金門縣']
var south = ['嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '澎湖縣']
var east = ['花蓮縣', '臺東縣']
var others = ['連江縣']
var card = document.querySelector('.card')
console.log(location);
var northBtn = document.querySelector('.north')
var middleBtn = document.querySelector('.middle')
var southBtn = document.querySelector('.south')
var eastBtn = document.querySelector('.east')
var othersBtn = document.querySelector('.others')
var sun = './images/sunny.png'
var cloud1 = './images/cloud1.png'
var cloud2 = './images/cloud2.png'
var rainBottom = './images/rain.png'
var cloudTop = './images/darkcloud.png'
// 使用fetch獲取天氣資料
fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D')
  .then(function (response) {
    return response.json()
  })
  .then(function (weather) {
    var location = weather.records.location

    for (let i = 0; i < location.length; i++) {
      // 降雨幾率<= 30%， 晴天（太陽圖）；30% <降雨幾率<= 60%，陰天（雲圖）；>60%, 雨天（雨圖）
      // 區分北部，中部，南部，東部以及其他地區

      content.style.display = 'none'
      northBtn.onclick = function () {
        if (north.includes(location[i].locationName) && location[i].weatherElement[1].time[0].parameter.parameterName <= 30) {
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
        }else if (middle.includes(location[i].locationName) && location[i].weatherElement[1].time[0].parameter.parameterName <= 30) {
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
      }




        
      }
      } else {

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

    // 太陽，下雨，多雲特效
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

    // 區分北部，中部，南部，東部以及其他地區
    var north = ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣', '新竹市', '宜蘭縣']
    var middle = ['苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '金門縣']
    var south = ['嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '澎湖縣']
    var east = ['花蓮縣', '臺東縣']
    var others = ['連江縣']
    var card = document.querySelector('.card')
    console.log(location);
    var northBtn = document.querySelector('.north')
    var middleBtn = document.querySelector('.middle')
    var southBtn = document.querySelector('.south')
    var eastBtn = document.querySelector('.east')
    var othersBtn = document.querySelector('.others')
    for (let i = 0; i < location.length; i++) {
      content.style.display = 'none'
      northBtn.onclick = function () {
        if (north.includes(location[i].locationName)) {

        }
      }
    }
  })

  // .then(function show(rule) {
  //   var north = 



  // }
  // })
//   if (i === 5 || i === 1 || i === 18 || i === 4 || i === 13 || i === 3  || i === 7) {

// }


