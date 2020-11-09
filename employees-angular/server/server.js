
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors')
app.use(cors())

app.use(express.static('public'))


const allEmployees = {
  '1': {
    "id": 1,
    "name": "Moshe",
    "color": "#CC0000",
    "animal": "Dog"
  },
  '2': {
    "id": 2,
    "name": "Ruti",
    "color": "yellow",
    "animal": "Cat"
  },
  '3': {
    "id": 3,
    "name": "Yossi",
    "color": "#009900",
    "animal": "Mouse"
  },
  '4': {
    "id": 4,
    "name": "Rachel",
    "color": "#CC0066",
    "animal": "Tiger"
  },
  '5': {
    "id": 5,
    "name": "Avi",
    "color": "blue",
    "animal": "Monkey"
  }
};

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.get('/api/employees', (request, response) => {
  response.send([1, 2, 3, 4, 5]);
});

app.get('/api/employees/:employeeId', (request, response) => {
  const employeeId = request.params.employeeId;  
  response.send(allEmployees[employeeId]);
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})