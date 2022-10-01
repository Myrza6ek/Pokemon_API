// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon/
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее

let mainDiv = document.getElementsByClassName("container")[0];

let ol = document.getElementById("orderList");

let blockModal = document.getElementById("blockModal");
let innerModal = document.getElementById("innerModal");

// mainDiv.append(ol);
// let br = document.createElement("br");
// ol.append(br);
let btnNext = document.getElementById("next");

let pok = fetch("https://pokeapi.co/api/v2/pokemon/");
pok
  .then(res => {
    return res.json();
  })
  .then(res => {
    // console.log(res);

    res.results.forEach(elem => {
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
          Рост: ${respo.height}
          Вес:  ${respo.weight}`;
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

    btnNext.addEventListener("click", () => {
      ol.innerText = "";
      let nxt = fetch(res.next);
      nxt
        .then(nxte => {
          return nxte.json();
        })
        .then(next => {
          // console.log(next);/
          // console.log(next.results);
          next.results.forEach(elem => {
            let b = fetch(elem.url);
            b.then(resp => {
              // console.log(resp);
              return resp.json();
            }).then(respo => {
              // console.log(respo.name);
              let li = document.createElement("li");
              li.innerText = respo.name;
              li.style.color = "#e50604";
              ol.append(li);
            });
          });
        });
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
