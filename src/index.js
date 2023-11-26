const express = require('express');
const connection = require('./database')
const session = require('express-session')
const connectionStore = require('express-mysql-session')(session)
const QRCode = require('qrcode');

const app = express();
const port = 3000;

// const isLoggedIn = (req, res, next) => {
//     console.log("first check");
// req.session.LoggedIn = false;
// console.log(req.session.LoggedIn);
// console.log(req.session.email);

//     if (!req.session) {
//         console.log("something");
//         return res.status(401).json({ status: "error", error: "not logged in" })
//       }
//     //   console.log("something");

//     console.log(req.session.LoggedIn);
//     if (!req.session.LoggedIn) {
//       res.status(401).json({ status: "error", error: "the user with this username is not present" })
//       return;
//     }

//     next();
//   };

app.use(express.static('static'));
app.use(express.json());
// app.use(isLoggedIn)

const sessionStore = new connectionStore({
    expiration: 1080000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessiontb1',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection)

app.use(session({
    key: 'keyin',
    secret: 'my secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))


app.get('/', (req, res) => {
    // req.session.isauth = true;
    res.sendFile('index.html');
})

app.get('/student', (req, res) => {
    // console.log(req.session.loggedIn)
    // console.log(req.session.email);
    res.sendFile('C:/Users/GAGAN/OneDrive/Desktop/inter/static/student.html')
})

app.get('/warden', (req, res) => {
    // console.log(req.session.loggedIn)
    // console.log(req.session.username);

    res.sendFile('C:/Users/GAGAN/OneDrive/Desktop/inter/static/warden.html')
})

app.get('/wardenDash', async (req, res) => {

    connection.query('SELECT * FROM application', async (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

app.get('/applicationStatus', async (req, res) => {

    connection.query('SELECT * FROM application', async (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

// for generating qr code 
app.post('/qrcode', (req, res) => {
    const url = req.body.student;
    // console.log(url);
    connection.query('SELECT * FROM login WHERE username=?', [url], async (err, resu) => {
        if (err) throw err;
        if (resu.length < 1) {
            return res.status(500).json({ status: "error", error: "the user with this username is not present" })
        }
        const timeperiodofcoupon = resu[0].couponapproval;
        if (Date.now() > timeperiodofcoupon) {
            QRCode.toDataURL(url, (err, qrCodeUrl) => {
                // console.log(qrCodeUrl);
                if (err) {
                    console.log(err);
                    throw err;
                }//86400000
                console.log(Date.now())
                const expirationTimestamp = Date.now() + 86400000;
                connection.query('UPDATE login SET couponapproval=? WHERE username=?', [expirationTimestamp, url], async (errorr, resultt) => {
                    if (err) throw err;
                })
                res.json({ qrCode: qrCodeUrl });
            })
        }
        else {
            return res.status(201).json({ status: "success", success: "the user with this username has active coupon" })
        }
    })
})

app.post('/qrcodechecker', async (req, res) => {
    const usn = req.body.student;
    if (!usn) {
        console.log("Enter the usn")
    }
    else {
        connection.query('SELECT * FROM login WHERE username=?', [usn], async (err, res) => {
            if (err) throw err;

            const approvalstatus = res[0].couponapproval;
            // console.log(approvalstatus)
            if (approvalstatus === 'null' || approvalstatus === 'decline') {
                const thestate = 'approve';
                connection.query('UPDATE login SET couponapproval=?', [thestate], async (error, result) => {
                    if (error) throw error;
                    return res.status(201).json({ status: "success" })
                })
            }
            else {
                console.log("u already have an coupon");
            }
        })
    }
})

app.post('/api/logout', async (req, res) => {
    // console.log("loggedout");
    req.session.destroy()
    req.session = null
    console.log("loggedout1");

    // console.log("loggedout2");
    return res.status(201).json({ status: "success", success: "logging out" })
})
app.post('/api/login', async (req, res) => {
    const email = req.body.email;
    // console.log(req.body)
    if (!email) return res.status(500).json({ status: "error", error: "Fill the email field" })
    else {
        connection.query('SELECT * FROM login WHERE email = ?', [email], async (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                const password = req.body.password;
                const user = result[0];

                if (password === user.password) {
                    // return res.status(201).json({ status: "success", success: "User logged in successfully" })
                    if (req.body.role === user.role) {
                        req.session.loggedIn = true;
                        req.session.email = user.email;
                        req.session.role = user.role;
                        // console.log(req.session.username)
                        // console.log(req.session.loggedIn)

                        if (user.role == 'WARDEN') {
                            return res.status(201).json({ status: "success", success: "User logged in successfully", role: "WARDEN" })
                        } else {
                            // console.log("stud");
                            return res.status(201).json({ status: "success", success: "User logged in successfully", role: "STUDENT" })
                        }
                        //res.redirect('/home')
                    }
                    else {
                        res.status(500).json({ status: "error", error: "wrong Role chosen" })
                    }
                }
                else {
                    res.status(500).json({ status: "error", error: "wrong passwords" })
                }
            } else {
                res.status(500).json({ status: "error", error: "No user found with this email" });
            }
        })
    }
});

app.post('/api/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email) {
        return res.status(500).json({ status: "error", error: "fill the username or email" })
    }
    else {
        connection.query('SELECT * FROM login WHERE username = ? OR email = ?', [username, email], async (err, result) => {
            if (err) {
                throw err;
            }

            if (result[0])
                return res.status(500).json({ status: "error", error: "Username or email already present" })

            else {
                let arole = 'WARDEN';
                connection.query('SELECT * FROM login WHERE role=?', [arole], async (errorrr, resulttt) => {
                    if (errorrr) {
                        throw errorrr
                    }
                    if (resulttt.length > 0 && role == 'WARDEN') {
                        return res.status(500).json({ status: "error", error: "Already a WARDEN is presnt" })
                    } else {


                        connection.query('INSERT INTO login (username, email, password, role) VALUES(?, ?, ?, ?)', [username, email, password, role], async (error, resultt) => {
                            if (error)
                                throw error;

                            return res.status(201).json({ status: "success", success: "user is registered" })
                        })
                    }
                })
            }
        })

    }
})

app.post('/api/student/application', async (req, res) => {
    const { name, usn, fromDate, tillDate, peri, number, description } = req.body;

    if (!name || !usn || !fromDate || !tillDate || !peri || !description) {
        return res.status(500).json({ status: "error", error: "fill the required fields" })
    }
    connection.query('SELECT * FROM application WHERE name = ? OR usn = ?', [name, usn], async (err, result) => {
        //console.log(result[0])
        if (err) throw err;
        if (result.length > 3) {
            return res.status(500).json({ status: "error", error: "Maximum number of application reached" })
        }
        else {
            connection.query('INSERT INTO application(name, usn, datestart, dateend, timeperiod, totalleave, description) VALUES(?, ?, ?, ?, ?, ?, ?)', [name, usn, fromDate, tillDate, peri, number, description], async (errr, ress) => {
                if (errr) {
                    throw errr;
                }
                return res.status(201).json({ status: "success", success: "SuccessFully Applied" })
            })
        }
    })
})

app.post('/approval/accept', async (req, res) => {
    const approve = 'accept';
    const id = req.body.id;
    connection.query('UPDATE application SET approval = ? WHERE slno = ?', [approve, id], (err, result) => {
        if (err) throw err;
        else {
            return res.status(201).json({ status: "success", success: "Successfully Updated" })
        }
    })
})

app.post('/approval/decline', async (req, res) => {
    const approve = 'decline';
    const id = req.body.id;
    connection.query('UPDATE application SET approval = ? WHERE slno = ?', [approve, id], (err, result) => {
        if (err) throw err;
        else {
            return res.status(201).json({ status: "success", success: "Successfully Updated" })
        }
    })
})
app.post('/api/checker', async (req, res) => {
    const username = req.body.checker;

    connection.query('SELECT * FROM application WHERE name=?', [username], (err, res) => {
        if (err) {
            throw err;
        }

        res.json(res);
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});