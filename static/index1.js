const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up')
    // eml = document.getElementById('email')
    // pass = document.getElementById('password')
    // user = document.getElementById('username')
    // emaillo = document.getElementById('emaillo')
    // passwordlo = document.getElementById('passwordlo')
    
signUp.addEventListener('click', () => {
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    loginIn.classList.toggle('none')
    loginUp.classList.toggle('block')
})
signIn.addEventListener('click', () => {
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    loginIn.classList.toggle('block')
    loginUp.classList.toggle('none')
})

loginIn.addEventListener("submit",(e)=>{

    e.preventDefault();

    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    const role=document.getElementById("dropdown").value
    const register={
        email,
        password,
        role
    }

    // console.log(register)

    fetch("http://localhost:3000/api/login",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(register)
    }).then(res=> {
        return res.json()
    }) 
    
        .then(data => {
            // console.log(data)
            if (data.status == "success") {
                if (data.role == 'STUDENT') {
                    alert(data.success+" as Student")
                    window.location.href='/student' 
                }else{
                    alert(data.success+" as Warden")
                    window.location.href='/warden'
                }
            } else {
                alert(data.error)
            }
        })
})
loginIn.addEventListener('submit', () => {
    
    // Get all input elements in the loginIn form
    const inputs = loginIn.querySelectorAll('input');
  
    // Clear the value of each input element
    for (const input of inputs) {
      input.value = '';
    }
  });
  
loginUp.addEventListener("submit",(e)=>{

  e.preventDefault();
  const username =document.getElementById("username").value
  const email=document.getElementById("emaillo").value
  const password=document.getElementById("passwordlo").value
  const role =document.getElementById("dropdownlo").value
  const register={
      username,
      email,
      password,
      role
  }

  //console.log(inputs);

  fetch("http://localhost:3000/api/register",{
      method:"POST",
      headers: {
          "Content-Type": "application/json"
      },
      body:JSON.stringify(register)
  }).then(res=> res.json())
  .then(data => {
      if (data.status == "success") {
          alert(data.success)
          window.location.href = '/';
      } else {
          alert(data.error)
      }
    //   console.log(inputs)
    //   for (let key in inputs) {
    //     key.valueOf = '';
    //   }
  })
})
loginUp.addEventListener('submit', () => {
  
    // Clear input form after alert
    // Get all input elements in the loginIn form
    const inputs = loginUp.querySelectorAll('input');
  
    // Clear the value of each input element
    for (const input of inputs) {
      input.value = '';
    }
  });
// loginIn.addEventListener('click', () => {
//     inputs.forEach(input => input.value = '')
// })
// loginUp.addEventListener('click', () => {
//     inputs.forEach(input => input.value = '')
//})
// loginIn.addEventListener('click', async(event) => {
//     event.preventDefault();

//     const formdata = new FormData(loginIn)
//     const formDataJSON = JSON.stringify(Object.fromEntries(formdata));
//     const response = await fetch('http://localhost:3000/api/login', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: formDataJSON
      //});
      // if (response.ok) {
      //   // The user is logged in successfully
      //   // Redirect the user to the dashboard page
      //   //window.location.href = '/dashboard';
      // } else {
      //   // An error occurred
      //   alert('An error occu while logging in');
      // }
//})
// loginIn.addEventListener('submit', () => {
//   const register = {
//     email: loginIn.querySelector('input[name="email"]').value,
//     password: loginIn.querySelector('input[name="password"]').value,
//     role: loginIn.querySelector('input[name="role"]').value
//   }
//   fetch('http://localhost:3000/api/login', {
//     method: "POST",
//     body: JSON.stringify(register),
//     headers: {
//       "Content-Type":"application/json"
//     }
//   }).then(res => res.json())
//   .then(data => {
//     if (data.status == 'error') {
//       console.log(data.status);
//     }
//   });
// });
// loginUp.addEventListener('submit', () => {
//   const register = {
//     username: loginUp.querySelector('input[name="username"]').value,
//     email: loginUp.querySelector('input[name="email"]').value,
//     password: loginUp.querySelector('input[name="password"]').value,
//     role: loginUp.querySelector('input[name="role"]').value
//   }
//   fetch('http://localhost:3000/api/register', {
//     method: "POST",
//     body: JSON.stringify(register),
//     headers: {
//       "Content-Type":"application/json"
//     }
//   }).then(res => res.json())
//   .then(data => {
//     if (data.status == 'error') {
//       console.log(data.status);
//     }
//   });
// });
//const myform=document.getElementById("login-in")
    // event.preventDefault();
    
    // const formData = new FormData(loginUp)
    // // const data = JSON.stringify(formData)
    // const response = await fetch('http://localhost:3000/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: formData
    //    })//const message = await response.text;
    //   // .then(response => {
    //     if (response.status === 200) {
    //       alert("inserted")
    //     }else{
    //     console.log("not hapenning")
    //     }
    //   })
        // window.location.href = 'http://localhost:3000/'
      // })
      

     
      
      
      // if (response.ok) {
      //   alert('successful')
      // } else {
      //   // An error occurred
      //   alert('An error occurred while logging in');}
