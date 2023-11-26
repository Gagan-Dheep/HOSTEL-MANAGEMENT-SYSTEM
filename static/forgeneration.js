
const theform = document.getElementById('codeg');

//function generationqr(datausn) {
theform.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = document.getElementById('usns').value
    const studentID = data; 
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
  // Extract the expiration timestamp from the URL
        // const expirationTimestamp = parseInt(new URL(qrCodeUrl).searchParams.get('expires'));
        // const isExpired = Date.now() > expirationTimestamp;
        // // imageGeneration(data.qrCode);
        //  if (!isExpired) {
        //     alert("yout coupon is not yet expired")
        //  }else{
            // const url = new URL(qrCodeUrl);
            // const actualqrdata = url.pathname;

            // console.log('Extracted qrCodeUrl:', actualqrdata);
            // const qrCodeWithExpiration = qr
            // const regex = /^(?<qrCodeUrl>[^?]+)\?/g;
            // const match = regex.exec(qrCodeWithExpiration);
            // if (match) {
            //     const qrCodeUrl = match.groups.qrCodeUrl;
            //     if (validqrcode) {
                 imageGeneration(qr)
            //     }
            //     // console.log('Extracted qrCodeUrl:', qrCodeUrl);
            //   } else {
            //     console.error('Failed to extract qrCodeUrl');
            //   }
            // console.log(match)
        //  }
        // `<!DOCTYPE html>
        //     <head>
        //     <title>Qr code generator</title>
        //     </head>
        //     <body>        
        //     <h1>The QR</h1>
        //     <img src="${qrCodeUrl}" alt="Qr-code">
        //     <p>Scan the qr to visit</p>
        //     </body>`
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
    imageqr.alt = QRCODE;
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
