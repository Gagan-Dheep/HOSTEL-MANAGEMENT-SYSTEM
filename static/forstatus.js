fetch('http://localhost:3000/applicationStatus')
    .then(response => response.json())
    .then(result => { 
        //  console.log(result)
        let helper = null;
        const tableBody = document.getElementById('data-table-body');
        for (const row of result) { 
            const tableRow = document.createElement('tr');
            for (const key in row) {
                if (key != 'slno') {
                    if (key != 'timeperiod') {
                        if (key == 'approval') {
                            helper = row[key];
                            console.log(helper);
                        }
                        if (key != 'approval') {
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
            const span = document.createElement('span');
            if (helper == 'pending') {
                span.textContent = 'Pending' 
            }
            else if (helper == 'accept') {
                span.textContent = 'Accepted'
            }
            else if (helper == 'decline') {
                span.textContent = 'Declined'
            }
            // button.textContent = "accept";
            span.classList.add('butto')
            tableRow.appendChild(span);
        }
    })
