// const logoutsu = document.getElementById('logouts')
// const logouthu = document.getElementById('logouth')

// logoutsu.addEventListener('click', () => {
    

//     fetch("http://localhost:3000/api/logout",{
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json"
//         }.then(res=> res.json())
//             .the(data => {
//                 if (data.status == 'success') {
//                     alert(data.success);
//                     window.location.href = '/'
//                 }
//                 // else{
//                 //     alert(data.error);
//                 //     window.location.href = ''
//                 // }
//             })
//     })
// })
// const leavebutton = document.getElementById('giveit')

// leavebutton.addEventListener('click', ()  => {
//     fetch("/application", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
// })
// function leaveApplication() {
//     fetch("application", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
// }