const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let objects = [
  { name: "Андрій", age: 18 },
  { name: "Максим", age: 22 },
  { name: "Даніл", age: 18 },
  { name: "Петро", age: 33 },
  { name: "Тарас", age: 71 },
];

// Парсер JSON для обробки POST-даних
app.use(bodyParser.json());

// Ендпойнт для отримання масиву об'єктів у форматі JSON
app.get("/objects", (req, res) => {
  res.json(objects);
});

// Ендпойнт для додавання нового об'єкту до масиву
app.post("/objects", (req, res) => {
  const newObject = req.body;
  objects.push(newObject);
  res.status(201).json(newObject);
});

// Статична сторінка з вбудованим JavaScript-скриптом
app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <script>
        // Запит на отримання масиву об'єктів через AJAX
        fetch('/objects')
          .then(response => response.json())
          .then(objects => {
            // Генерація таблиці з отриманими об'єктами
            const table = document.createElement('table');
            const headerRow = table.insertRow();
            Object.keys(objects[0]).forEach(key => {
              const th = document.createElement('th');
              th.textContent = key;
              headerRow.appendChild(th);
            });
            objects.forEach(object => {
              const row = table.insertRow();
              Object.values(object).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
              });
            });
            document.body.appendChild(table);
          });
        
        // Відправка даних форми через AJAX
        function addNewObject() {
          const name = document.getElementById('name').value;
          const age = document.getElementById('age').value;
          
          fetch('/objects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age })
          })
            .then(response => response.json())
            .then(newObject => {
              // Додавання нового рядка до таблиці
              const table = document.querySelector('table');
              const row = table.insertRow();
              Object.values(newObject).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
              });
            });
        }
      </script>
    </head>
    <body>
      <form>
        <input type="text" id="name" placeholder="Name">
        <input type="number" id="age" placeholder="age">
        <button type="button" onclick="addNewObject()">Додати</button>
      </form>
    </body>
    </html>
  `);
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Сервер запущено на порту 3000");
});
