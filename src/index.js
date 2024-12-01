const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const authRegister = require('./auth/authRegister')
const authLogin = require('./auth/authLogin')
const authLogout = require('./auth/authLogout')
const applicationStatus = require('./route/applicationStatus')
const qrcode = require('./route/qrcode')
const qrcodechecker = require('./route/qrcodechecker')
const wardenDash = require('./route/wardenDash')
const applystudentapplication = require('./route/applystudentapplication')
const approvalacceptance = require('./route/approvalacceptance')
const approvaldecline = require('./route/approvaldecline')
const getStudentHome = require('./route/getStudentHome')
const getWardenHome = require('./route/getWardenHome')
const attendanceStudentRequest = require('./route/attendanceStudentRequest')
const getAttendanceStudentRequest = require('./route/getAttendanceStudentRequest')
const markAttendence = require('./route/markAttendence')
const attendanceStatus = require('./route/attendanceStatus')
const downloadHistory = require('./route/downloadHistory')
const historyForStudents = require('./route/historyForStudents')
const app = express();
const port = 3000; 

app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser("gagan", { httpOnly: true, signed: true }));
app.use(bodyParser.json())
app.use('/api/register', authRegister)
app.use('/api/login', authLogin)
app.use('/api/logout', authLogout);
app.use('/applicationStatus', applicationStatus)
app.use('/qrcode', qrcode)
app.use('/qrcodechecker', qrcodechecker)
app.use('/api/student/application', applystudentapplication)
app.use('/wardenDash', wardenDash)
app.use('/approval/decline', approvaldecline)
app.use('/approval/accept', approvalacceptance)
app.use('/student', getStudentHome)
app.use('/warden', getWardenHome)
app.use('/attendance/request', attendanceStudentRequest)
app.use('/attendance/requests', getAttendanceStudentRequest)
app.use('/attendance/mark', markAttendence)
app.use('/attendance/request/status', attendanceStatus)
app.use('/attendance/download/:studentId', downloadHistory)
app.use('/getHistoryForWarden', historyForStudents)

app.get('/', (req, res) => {
    res.sendFile('./index.html');
})

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});