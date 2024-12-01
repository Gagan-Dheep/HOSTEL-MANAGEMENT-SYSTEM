
const API_URL = 'http://localhost:3000'; 
const studentId = localStorage.getItem("username"); 
const downloadCsv = document.getElementById('download-csv')

downloadCsv.addEventListener('click', () => {
    const studentId = localStorage.getItem("username"); // Replace with the actual student ID dynamically.
    const API_URL = `http://localhost:3000/attendance/download/${studentId}`;

    // Trigger the download
    const link = document.createElement('a');
    link.href = API_URL;
    link.setAttribute('download', `attendance_${studentId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

document.addEventListener('DOMContentLoaded', () => {
    const studentsTableBody = document.querySelector('#students-table tbody');

    async function fetchStudents() {
        try {
            const response = await fetch(`${API_URL}/getHistoryForWarden`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }

            const students = await response.json();

            studentsTableBody.innerHTML = '';
            students.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.student_id}</td>
                        <td>${student.student_id}</td>
                        <td>Warden</td>
                    </tr>
                `;
                studentsTableBody.insertAdjacentHTML('beforeend', row);
            });
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    window.downloadCSV = function(studentId) {
        const link = document.createElement('a');
        link.href = `${API_URL}/attendance/${studentId}`; // Ensure the backend endpoint matches
        link.setAttribute('download', `attendance_${studentId}.csv`);
        link.click();
    };

    fetchStudents();
});
