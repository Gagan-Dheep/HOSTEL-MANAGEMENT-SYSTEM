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
                localStorage.setItem("username", email)
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
