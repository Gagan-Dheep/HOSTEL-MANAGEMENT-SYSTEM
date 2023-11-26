const fromDateInput = document.getElementById('from'),
    tilldate = document.getElementById('till'),
    period = document.getElementById('period'),
    number = document.getElementById('number'),
    application = document.getElementById('appl')

fromDateInput.addEventListener('change', updateTotalDays)
tilldate.addEventListener('change', updateTotalDays)
period.addEventListener('change', updateTotalDays)

let usethis = document.getElementById('period').value
// function updateTotalDays(fromD, tillD, perio) {
//     let be = userr(fromD, tillD, period);
//     number.value = be;
// }
// function updateTotalDays(fromD, tillD, perio) {
//     const start = new Date(fromD);
//     const end = new Date(tillD);

//     if (start > end) {
//         throw new Error("Start date connot be after end date")
//     }

//     let totalDays = 0;
//     let halfDays = 0;

//     while(start <= end) {
//         if (perio === "ForeNoon" || perio === "AfterNoon") {
//             halfDays++;
//         }
//         else if (perio === "FullDay"){
//             totalDays++;
//             halfDays++;
//         }
//         start.setDate(start.getDate() + 1);
//     }
//     const fullDaysFromHolidays = Math.floor(halfDays / 2);
//     totalDays += fullDaysFromHolidays;

//     return totalDays;
// }
function updateTotalDays() {
    const fromDate = new Date(fromDateInput.value);
    const toDate = new Date(tilldate.value);

    // const per = new Date(tilldate.value)
    let n = 1.0;
    if (usethis == 'Forenoon' || usethis == 'Afternoon') {
    }
    else if (usethis == 'Fullday') {
        n = 1.0;
    }
    console.log(n)
    const timeDifference = toDate.getTime() - fromDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // const use = per + daysDifference;
    let use = n * daysDifference;
    number.value = use;

}


application.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const usn = document.getElementById('usn').value;
    const fromDate = document.getElementById('from').value;
    const tillDate = document.getElementById('till').value;
    const peri = document.getElementById('period').value;
    const number = document.getElementById('number').value;
    const description = document.getElementById('desc').value;

    // const fdate = new Date(fromDate);
    // const tdate = new Date(tillDate)
    const register = {
        name,
        usn,
        fromDate,
        tillDate,
        peri,
        number,
        description
    };
    // console.log(register)
    fetch("http://localhost:3000/api/student/application", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(register)
    }).then(res => res.json())
        .then(data => {
            if (data.status == 'success') {
                alert(data.success)
            }
            else {
                alert(data.error)
            }
        })
})

application.addEventListener('submit', () => {
    // ...

    // Clear input form after alert
    // Get all input elements in the loginIn form
    const inputs = application.querySelectorAll('input');

    // Clear the value of each input element
    for (const input of inputs) {
        input.value = '';
    }
    const textar = document.getElementById('desc')
    textar.value = '';
});