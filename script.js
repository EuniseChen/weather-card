// 使用fetch獲取天氣資料
fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D')
  .then(function (response) {
    return response.json()
  })
  .then(function (weather) {
    var content = document.querySelector('.content')
    var location = weather.records.location
    render() // 首次渲染

    // 區分北部，中部，南部，東部以及其他地區
    var north = ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣', '新竹市', '宜蘭縣']
    var middle = ['苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '金門縣']
    var south = ['嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '澎湖縣']
    var east = ['花蓮縣', '臺東縣']
    var others = ['連江縣']

    var allBtn = document.querySelector('.all')
    var northBtn = document.querySelector('.north')
    var middleBtn = document.querySelector('.middle')
    var southBtn = document.querySelector('.south')
    var eastBtn = document.querySelector('.east')
    var othersBtn = document.querySelector('.others')
    var btns = document.querySelector('.nav').children

    for (let i = 0; i < btns.length; i++) {
      // 改變被選取區域的背景顏色
      btns[i].addEventListener('click', () => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].style.backgroundColor = 'rgba(255, 255, 255, 0.6)'
        }
        btns[i].style.backgroundColor = '#0A9ABC'
      })
    }

    function sortDistrict(district, location) {
      var newLocation = [] // 建立新陣列準備接收判斷後的數據
      for (let i = 0; i < location.length; i++) {
        if (district.includes(location[i].locationName) != false) {
          // 判斷傳入的區域地名是否有locationName
          newLocation.push(location[i]) // 如有將地名傳入新的陣列
        }
      }
      return newLocation // 返回新陣列 使sortDistrict(district, location)的值為新陣列
    }

    allBtn.onclick = function () {
      // 全部
      render()
    }

    northBtn.onclick = function () {
      // 北部
      saveLocation = location // 保存原本陣列地址
      location = sortDistrict(north, location) // 傳入需判斷的地區參數，之後接收返回的新陣列，此時原本陣列地址發生改變
      content.innerHTML = '' // 清空畫面 避免重複渲染
      render() // 依照新陣列的數據來渲染畫面
      location = saveLocation // 將改變後的陣列地址重新導回為原本地址，供下次調用
    }

    middleBtn.onclick = function () {
      // 中部
      saveLocation = location
      location = sortDistrict(middle, location)
      content.innerHTML = ''
      render()
      location = saveLocation
    }

    southBtn.onclick = function () {
      // 南部
      saveLocation = location
      location = sortDistrict(south, location)
      content.innerHTML = ''
      render()
      location = saveLocation
    }

    eastBtn.onclick = function () {
      // 東部
      saveLocation = location
      location = sortDistrict(east, location)
      content.innerHTML = ''
      render()
      location = saveLocation
    }

    othersBtn.onclick = function () {
      // 其他
      saveLocation = location
      location = sortDistrict(others, location)
      content.innerHTML = ''
      render()
      location = saveLocation
    }

    function render() {
      for (let i = 0; i < location.length; i++) {
        // 降雨幾率<= 30%， 晴天（太陽圖）；30% <降雨幾率<= 60%，陰天（雲圖）；>60%, 雨天（雨圖）
        if (location[i].weatherElement[1].time[0].parameter.parameterName < 30) {
          var sun = './images/sunny.png'
          content.innerHTML += `
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
        } else if (location[i].weatherElement[1].time[0].parameter.parameterName <= 60) {
          var cloud1 = './images/cloud-back.png'
          var cloud2 = './images/cloud-front.png'
          content.innerHTML += `
            <div class="card animate__animated animate__zoomIn">
              <div class="location-container">
                <h1 class="location">${location[i].locationName}</h1>
              </div>
              <div class="info">
                <img src="${cloud1}" alt="" class="cloud-back">
                <img src="${cloud2}" alt="" class="cloud-front">
                <div class="weather">${location[i].weatherElement[0].time[0].parameter.parameterName}</div>
                <div class="temperature">${location[i].weatherElement[2].time[0].parameter.parameterName}~${location[0].weatherElement[4].time[0].parameter.parameterName}℃</div>
              </div>
                <div class="sense">${location[i].weatherElement[3].time[0].parameter.parameterName}</div>
          </div>
          `
        } else {
          var rainBottom = './images/rain.png'
          var cloudTop = './images/darkcloud.png'
          content.innerHTML += `
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
      var spin = document.querySelectorAll('.sun')
      var rainDrop = document.querySelectorAll('.rain')
      var cloudBack = document.querySelectorAll('.cloud-back')
      var cloudFront = document.querySelectorAll('.cloud-front')

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
    }
  })


