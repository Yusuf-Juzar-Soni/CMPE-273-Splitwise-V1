const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const PORT = 3001;
const session = require("express-session");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "compe273_lab1_splitwise",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const con = mysql.createConnection({
  host: "splitwisedb.ca0vnrrcatej.us-east-2.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", //user name to your my sql server
  password: "test1234",
  database: "splitwise_db",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected!");
});

//Allow Access Control

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", function (req, res) {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  con.query(
    "INSERT INTO users (username, user_email, password) VALUES (?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log("User already present!!");
          res.status(409).json({ message: "User already exists!" });
        }
      } else {
        const user = { username: req.body.email, password: req.body.password };
        req.session.user = user;
        res.status(200).json({ name: req.body.name });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  con.query(
    "SELECT * FROM  users WHERE user_email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) throw err;
      if (result) {
        if (result.length) {
          let user = {
            username: req.body.email,
            password: req.body.password,
          };
          user = { username: req.body.email, password: req.body.password };
          req.session.user = user;
          console.log(result)
          res.status(200).json({ result });


          res.end("Successful Login");
        } else if (result.length === 0) {
          res.status(404).json({ message: "Invalid credentials!" });
        }
      }
    }
  );
});

app.post('/dashboard',(req,res)=>{
  let {email} =req.body
  con.query("SELECT group_name FROM user_group WHERE user_email=?",[email],function(err,result){
    let groups=[];
    for(let i=0;i<result.length;i++){
      groups.push(result[i].group_name)
    }

    res.status(200).json(groups)
  })
});
// app.get("/mygroups", function (req, res) {
//   const useremail = req.body.email;
//   const getGroupQuery =
//     "select * from groups where user_email='" + useremail + "'";
//   con.query(getGroupQuery, (err, result) => {
//     if (err) throw err;
//     Object.keys(result).forEach(function (key) {
//       const row = result[key];
//       console.log(row.group_name);
//     });
//   });
// });

// app.post("/addgroup", function (req, res) {
//   const groupName = req.body.groupName;
//   const users = req.body.users;
//   const insertGroup =
//     "insert into groupinfo(group_name, group_pic) values('" +
//     groupName +
//     "','picture')";
//   const usergroupQUery =
//     "insert into usergroup(email,group_name,inviteacceptance) values('" +
//     users +
//     "','" +
//     groupName +
//     "',0)";
//   console.log(insertGroup);
//   console.log(usergroupQUery);
//   con.query(insertGroup, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
//   con.query(usergroupQUery, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// });

app.listen(PORT, () => {
  console.log("Server connected to port 3001");
});
