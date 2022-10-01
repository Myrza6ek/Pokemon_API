// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

let mainDiv = document.getElementsByClassName("container")[0];

let ol = document.getElementById("orderList");

let blockModal = document.getElementById("blockModal");
let innerModal = document.getElementById("innerModal");

// mainDiv.append(ol);
// let br = document.createElement("br");
// ol.append(br);
let btnNext = document.getElementById("next");
let btnPrev = document.getElementById("prev");

let pokems = fetch("https://pokeapi.co/api/v2/pokemon/");

let somethng = "";
pokems
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log(res);

    function pokemsFunc(param) {
      somethng = param;
      param.results.forEach(elem => {
        // console.log(elem.url);

        let a = fetch(elem.url);
        a.then(resp => {
          // console.log(resp);
          return resp.json();
        }).then(respo => {
          // console.log(respo.name);
          let li = document.createElement("li");
          li.innerText = respo.name;
          li.style.color = "#e50604";
          ol.append(li);
          // console.log(respo);
          // click
          li.addEventListener("click", () => {
            blockModal.style.display = "block";

            //create image in modal block
            let img = document.createElement("img");
            img.setAttribute("src", respo.sprites.front_default);
            img.style.width = "180px";
            img.style.height = "195px";
            innerModal.append(img);

            let divAbout = document.createElement("div");
            divAbout.style.width = "300px";
            divAbout.style.height = "150px";
            divAbout.style.fontSize = "26px";
            divAbout.style.fontWeight = "bold";
            divAbout.style.textAlign = "center";

            divAbout.innerText = `Имя: ${respo.name}
            Тип: ${respo.types[0].type.name}
            Уровень: ${respo.height}
            Ресурсы:  ${respo.weight}`;
            innerModal.append(divAbout);

            let closeBtn = document.createElement("button");
            closeBtn.innerText = "CLOSE";
            closeBtn.style.borderRadius = "5px";
            closeBtn.style.backgroundColor = "gold";
            closeBtn.style.color = "#e50604";
            closeBtn.style.fontSize = "20px";

            innerModal.prepend(closeBtn);

            closeBtn.addEventListener("click", () => {
              blockModal.style.display = "none";
              innerModal.innerHTML = "";
            });
          });
        });
      });
    }

    pokemsFunc(res);

    btnNext.addEventListener("click", () => {
      if (!somethng.next) {
        alert("The last page!!!");
      } else {
        let nxt = fetch(somethng.next);
        nxt
          .then(nxte => {
            return nxte.json();
          })
          .then(nexto => {
            console.log(nexto);
            ol.innerHTML = "";
            pokemsFunc(nexto);
          });
      }
    });

    btnPrev.addEventListener("click", () => {
      if (!somethng.previous) {
        alert("the first page");
      } else {
        let prvs = fetch(somethng.previous);
        prvs
          .then(prev => {
            return prev.json();
          })
          .then(prevss => {
            console.log(prevss);
            ol.innerHTML = "";
            pokemsFunc(prevss);
          });
      }
    });
  });

// Задание №2
// Создать страницу прогноза погоды.

// Дан API - https://goweather.herokuapp.com/weather/{city}
// {city} – название нужного города (подставить из инпута);
// Название города нужно получить из инпута, после нажатия на кнопку.
// <input id="city-name" type="text">
// <button id="show">Show Weather</button>

// При клике на кнопку, отобразите на странице температуру
// воздуха на сегодняшний день и среднюю скорость ветра.
// Также, отобразите прогноз погоды на ближайшие три дня.
// Если введенного города нет, выведите в alert соответствующее сообщение.
// Примечание! Если город не найден, API вернет пустые строчки в качестве значений свойств.

// Подсказка об используемых ключах результата:
// (предположим что полученный объект у вас лежит в переменной result)
// Температура: result.temperature
// Средняя скорость ветра: result.wind

// Прогноз погоды на ближайшие дни находится в массиве forecast.
// result.forecast
