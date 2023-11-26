const logout = document.getElementById('logout-button')

logout.addEventListener('click', () => {
    // e.preventDefault();
    fetch('http://localhost:3000/api/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
         return res.json()})
    .then(data => {
        console.log(data);
        if (data.status == 'success') {
            window.location.href= '/'
        }else{
            alert(data.error)
        }
    })
})