// let tasks = [];
// let myTasks;

// fetch("/api/task")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     // save db data on global variable
//     tasks = data;

//     populateTotal();
//     populateTable();
//     populateChart();
//   });

// function populateTotal() {
//   // reduce task amounts to a single total value
//   let total = tasks.reduce((total, t) => {
//     return total + parseInt(t.value);
//   }, 0);

//   let totalEl = document.querySelector("#total");
//   totalEl.textContent = total;
// }

// function populateTable() {
//   let tbody = document.querySelector("#tbody");
//   tbody.innerHTML = "";

//   tasks.forEach(task => {
//     // create and populate a table row
//     let tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${task.name}</td>
//       <td>${task.value}</td>
//     `;

//     tbody.appendChild(tr);
//   });
// }

// function populateChart() {
//   // copy array and reverse it
//   let reversed = tasks.slice().reverse();
//   let sum = 0;

//   // create date labels for chart
//   let labels = reversed.map(t => {
//     let date = new Date(t.date);
//     return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//   });

//   // create incremental values for chart
//   let data = reversed.map(t => {
//     sum += parseInt(t.value);
//     return sum;
//   });

//   // remove old chart if it exists
//   if (myChart) {
//     myChart.destroy();
//   }

//   let ctx = document.getElementById("myChart").getContext("2d");

//   myChart = new Chart(ctx, {
//     type: 'line',
//       data: {
//         labels,
//         datasets: [{
//             label: "Total Over Time",
//             fill: true,
//             backgroundColor: "#6666ff",
//             data
//         }]
//     }
//   });
// }

// function sendtask(isAdding) {
//   let nameEl = document.querySelector("#t-name");
//   let amountEl = document.querySelector("#t-amount");
//   let errorEl = document.querySelector(".form .error");

//   // validate form
//   if (nameEl.value === "" || amountEl.value === "") {
//     errorEl.textContent = "Missing Information";
//     return;
//   }
//   else {
//     errorEl.textContent = "";
//   }

//   // create record
//   let task = {
//     name: nameEl.value,
//     value: amountEl.value,
//     date: new Date().toISOString()
//   };

//   // if subtracting funds, convert amount to negative number
//   if (!isAdding) {
//     task.value *= -1;
//   }

//   // add to beginning of current array of data
//   tasks.unshift(task);

//   // re-run logic to populate ui with new record
//   populateChart();
//   populateTable();
//   populateTotal();
  
//   // also send to server
//   fetch("/api/task", {
//     method: "POST",
//     body: JSON.stringify(task),
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json"
//     }
//   })
//   .then(response => {    
//     return response.json();
//   })
//   .then(data => {
//     if (data.errors) {
//       errorEl.textContent = "Missing Information";
//     }
//     else {
//       // clear form
//       nameEl.value = "";
//       amountEl.value = "";
//     }
//   })
//   .catch(err => {
//     // fetch failed, so save in indexed db
//     console.log(err);
//     saveRecord(task);

//     // clear form
//     nameEl.value = "";
//     amountEl.value = "";
//   });
// }

// document.querySelector("#add-btn").onclick = function() {
//   sendtask(true);
// };

// document.querySelector("#sub-btn").onclick = function() {
//   sendtask(false);
// };
