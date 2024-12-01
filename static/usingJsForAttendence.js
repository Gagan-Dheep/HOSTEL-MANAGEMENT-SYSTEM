const request = document.getElementById("request");
const attendanceRequest = document.getElementById("attendanceRequestForm");
const submitButton = document.getElementById("submitButton");
const submitted = document.getElementById("submitted")
// Set the student ID from local storage
request.value = localStorage.getItem("username");

// Check if the student already sent a request for today
async function checkRequestStatus() {
    const studId = request.value;

    const response = await fetch('http://localhost:3000/attendance/request/status', { // New endpoint to check request status
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studId }),
    });

    const data = await response.json();
    console.log(data);
    if (data.alreadyRequested) {
      submitted.style.display = 'block'
    }
    
    if (data.alreadyRequested) {
        submitButton.disabled = true; // Disable the button if already requested
    } else {
        submitButton.disabled = false;
    }
}

// Run the check on page load
checkRequestStatus();

// Handle form submission
attendanceRequest.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studId = request.value;

    const response = await fetch('http://localhost:3000/attendance/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studId }),
    });

    const message = await response.text();

    if (response.status === 201) {
        alert('Attendance request submitted successfully.');
        submitButton.disabled = true; // Disable the button after successful submission
    } else {
        alert(message);
    }
});
