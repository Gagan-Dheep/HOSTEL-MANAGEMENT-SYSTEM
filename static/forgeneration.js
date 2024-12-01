const data = document.getElementById('usns')
const theform = document.getElementById('codeg');

data.value = localStorage.getItem("username")

theform.addEventListener('submit', (e) => {
    e.preventDefault();
    // const data = document.getElementById('usns').value
    const studentID = data.value; 
    console.log(studentID);
    
    fetch('http://localhost:3000/qrcode', {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body:JSON.stringify(studentID)
        body:JSON.stringify({student: studentID})
     }).then(data => data.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.success)
        }
        else if(data.status === 'error') {
            alert(data.error)
        }
        else{
        // console.log(data.qrCode)
        const qr = data.qrCode;
        alert("Your coupon is generated with 1 day validation")
                 imageGeneration(qr)
            
        }
    })
//})
})
const validqrcode = (qrCodeUrl) => {
    // Extract the expiration timestamp from the URL
    const expirationTimestamp = parseInt(new URL(qrCodeUrl).searchParams.get('expires'));
    const isExpired = Date.now() > expirationTimestamp;
    // imageGeneration(data.qrCode);
     if (isExpired) {
        alert("your coupon is expired hence a new coupon is generated")
        return true;
     }else{
        alert("your coupon is  yet valid")
        return false;
     }
}
const imageGeneration = (qrCodeUrl) => {
    const imageqr = document.getElementById('qrcodee');
    imageqr.src = qrCodeUrl;
    imageqr.alt = "QRCODE";
    imageqr.classList.add('qr-code-center')

    // const image = document.createElement('img')
    // image.setAttribute("src", qrCodeUrl);
    // image.setAttribute("alt", "qr-code");


    // const helper = `<img src="${qrCodeUrl}" alt="Qr-code"></img>`
    //imageqr.appendChild(image);
}
// theform.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const datausn = document.getElementById('usns').value

//     const studentID = datausn; 
//     fetch('http://localhost:3000/qrcodechecker', {
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         // body:JSON.stringify(studentID)
//         body:JSON.stringify({student: studentID})
//      })
//      .then(data => data.json())
//      .then(data => {
//         if (data.status == 'success') {
//             generationqr(datausn);
//         }
//         else{
            
//         }
//      })
// })
