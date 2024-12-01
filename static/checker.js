const checker = document.getElementById('checker');

checker.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById("name").value
    fetch('http://localhost:3000/api/checker', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(checker)
    })
}).then(res => res.json())
    .then(res => {

    })