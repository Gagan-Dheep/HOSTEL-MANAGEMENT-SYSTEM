fetch('http://localhost:3000/wardenDash')
    .then(response => response.json())
    .then(result => {
         console.log(result)
        const tableBody = document.getElementById('data-table-body');
        for (const row of result) {
            const tableRow = document.createElement('tr');
            for (const key in row) {
                if (key != '_id') {
                    if (key != 'timeperiod') {
                        if (key != 'approval') {
                            // if(row[key] != 'null'){
                            // console.log(row[key].approval)
                            // console.log(key)
                            const tableCell = document.createElement('td');
                            tableCell.textContent = row[key];
                            tableRow.appendChild(tableCell);
                        }

                        tableBody.appendChild(tableRow);
                    }
                }
            }
            //  if (result.approval != 'decline') {
            const button = document.createElement('button');
            button.textContent = "accept";
            button.classList.add('butto')
            tableRow.appendChild(button);
            console.log(row);
            
            button.addEventListener('click', () => {

                fetch('http://localhost:3000/approval/accept', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: row._id,
                    })
                })
                button.remove();
                button.classList.remove('butto')
                button2.remove();
            })
            const button2 = document.createElement('button');
            button2.textContent = "decline";
            button2.classList.add('butto')
            tableRow.appendChild(button2);
            button2.addEventListener('click', () => {

                fetch('http://localhost:3000/approval/decline', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: row._id,
                    })
                }) 
                button2.remove();
                button.remove();
                button2.classList.remove('butto')
            })
        }
    })



// fetch('/http://localhost:3000/wardenDash.html')
//   .then(response => response.json())
//   .then(data => {
//     // const tableBody = document.getElementById('data-table-body');
// for (const row of data) {
//   const tableRow = document.createElement('tr');
//   for (const key in row) {
//     const tableCell = document.createElement('td');
//     tableCell.textContent = row[key];
//     tableRow.appendChild(tableCell);
//   }
//   tableBody.appendChild(tableRow);
// }
//     const tableBody = document.getElementById('data-table-body');
//     const tableRow = document.createElement('tr');
//     const tableCell = document.createElement('td');

//     tableCell.textContent = data[0]
//     tableRow.appendChild(tableCell)
//     tableBody.appendChild(tableRow)
//   });