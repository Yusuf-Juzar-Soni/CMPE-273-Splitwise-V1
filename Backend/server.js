const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const PORT = 3001;
const session = require("express-session");
const groupWorkerFunc = require("./groupWorkers");
const billWorkerFunc = require("./billWorker");
const transactWorkerFunc = require("./transactionWorker");
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
        res.status(200).json({ name: req.body.name, email: req.body.email });
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
          console.log(result);
          res.status(200).json({ result });

          res.end("Successful Login");
        } else if (result.length === 0) {
          res.status(404).json({ message: "Invalid credentials!" });
        }
      }
    }
  );
});

app.post("/dashboard", (req, res) => {
  let { email } = req.body;
  con.query(
    "SELECT group_name FROM user_group WHERE user_email=?",
    [email],
    function (err, result) {
      let groups = [];
      for (let i = 0; i < result.length; i++) {
        groups.push(result[i].group_name);
      }

      res.status(200).json(groups);
    }
  );
});

app.get("/allUsers/:email", (req, res) => {
  con.query(
    "select user_email, username from users where user_email != ?",
    [req.params.email],
    (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).json({ error: "an error occured" });
      }
    }
  );
});

app.post("/allMembers", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.groupname);
  con.query(
    "select user_email from user_group where user_email !=? and group_name = ?",
    [req.body.email, req.body.groupname],
    (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).json({ error: "an error occured" });
      }
    }
  );
});

app.post("/addBill", function (req, res) {
  console.log(req.body);
  const user = req.body.user;
  const billdesc = req.body.billData;
  const amount = req.body.amount;
  const group = req.body.group;
  const members = req.body.members;
  const split_amount = amount / members.length;
  console.log(user);
  console.log(billdesc);
  console.log(amount);
  console.log(group);
  console.log(members);
  console.log(split_amount);

  billWorkerFunc.BillAdd(amount, billdesc, user, split_amount, group);

  // con.query(
  //   "INSERT INTO bill_table (bill_amount, bill_desc, created_by,split_amount,bill_group) VALUES (?,?,?,?,?)",
  //   [amount,billdesc,user,split_amount,group],
  //   (err, result) => {
  //     if (err) {
  //       if (err.code === "ER_DUP_ENTRY") {
  //         console.log("Bill addition failed");
  //       }
  //     } else {
  //       console.log("Bill Added Successfully" );

  //     }

  //   }
  // );

  // con.query(
  //   "SELECT MAX(bill_id) from bill_table",
  //   (err, result) => {
  //     if (err) {
  //       console.log("could not fetch bill id");
  //     } else {
  //       console.log(result);
  //       return result;
  //     }
  //   }
  // );
  //console.log(bill_id);

  for (member of members) {
    con.query(
      "INSERT INTO transaction_table (sender, receiver, transaction_amount,bill_group) VALUES (?,?,?,?)",
      [user, member.user_email, split_amount, group],
      (err, result) => {
        if (err) {
          if (err) {
            console.log(err);
          }
        } else {
          console.log("Bill Added Successfully in transaction table");
        }
      }
    );
  }
  res.status(200).json({ message: " successfully added in both" });
});

app.post("/createGroup", (req, res) => {
  console.log(req.body.members);
  console.log(req.body.groupName);

  groupWorkerFunc
    .createGroup(req.body.groupName, req.body.members, req.body.user)
    .then((result) => {
      if (result == true) {
        res.status(200).json({ messgae: "successful" });
      } else {
        if (result.code === "ER_DUP_ENTRY") {
          res.status(409).json({ message: "failure" });
        } else {
          res.status(400).json({ message: "failure" });
        }
      }
    });
});

app.get("/fetchBills/:group", (req, res) => {
  con.query(
    "select created_by, bill_amount, bill_timestamp from bill_table where bill_group = ?",
    [req.params.group],
    (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).json({ error: "an error occured" });
      }
    }
  );
});

app.get("/Activity/:email", (req, res) => {
  con.query(
    "SELECT * from bill_table where bill_group IN(select group_name from user_group where user_email = ?)",
    [req.params.email],
    (err, result) => {
      if (!err) {
        console.log(result);
        res.status(200).send(result);
      } else {
        res.status(400).json({ error: "an error occured" });
      }
    }
  );
});

app.post("/userdetails", (req, res) => {
  con.query(
    "SELECT * from users where user_email = ?",
    [req.body.email],
    (err, result) => {
      console.log(result);
      if (!err) {
        console.log(result);
        res.status(200).send(result);
      } else {
        res.status(400).json({ error: "an error occured" });
      }
    }
  );
});

app.get("/fetchAmountsOwed/:email", (req, res) => {
  transactWorkerFunc.amountOwedToMe(req.params.email).then((result) => {
    if (result) {
      console.log("Success fetched owed amount");
      res.status(200).send(result);
    }
  });
});

app.get("/fetchAmountsIOwe/:email", (req, res) => {
  transactWorkerFunc.amountIOwe(req.params.email).then((result) => {
    if (result) {
      console.log("Success fetched owed amount");
      res.status(200).send(result);
    }
  });
});

async function fetchResultIOwe(user) {
  let result = [];
  let groups = await groupWorkerFunc.getGroups(user);
  console.log(groups);
  let stringGroups = "";
  if (!groups) {
    return;
  }
  for (let group of groups) {
    stringGroups = stringGroups + "'" + group.group_name + "',";
  }
  stringGroups = stringGroups.substring(0, stringGroups.length - 1);
  let members = await groupWorkerFunc.getMembersAcrossGroups(stringGroups);
  console.log("hello", members);
  if (!members) {
    members = [];
  }

  for (let email of members) {
    let sent = await groupWorkerFunc.getAmount(user, email.user_email);
    let recieved = await groupWorkerFunc.getAmount(email.user_email, user);
    let diff = sent[0].Sum - recieved[0].Sum;
    result.push({ email: email.user_email, amt: diff });
  }
  console.log(result);
  return result;
}

app.get("/amount/:user", (req, res) => {
  console.log(req.params.user);

  fetchResultIOwe(req.params.user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      //need to add error handling
      console.log(err);
    });
});

app.post("/settleUp", (req, res) => {
  console.log("user", req.body.user);
  console.log("sender", req.body.sender);

  con.query(
    "UPDATE transaction_table SET transaction_amount = 0 WHERE sender=? AND receiver=?",
    [req.body.sender, req.body.user],
    (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).json({ error: "an error occured" });
      }
    }
  );
});

// app.post("/createGroup", function (req, res) {
//   console.log(req.body);
//   console.log(req.body.members);
//   console.log(req.body.groupName);
//   const groupName = req.body.groupName;
//   const members = req.body.members;
//   const user = req.body.user;

//   console.log(groupName);
//   console.log(members);
//   console.log(user);

//   con.query(
//     "insert into splitwise_db.groups (group_name) values (?)",
//     [groupName],
//     (err, result) => {
//       if (err) {
//         if (err.code === "ER_DUP_ENTRY") {
//           console.log("Group already present!!");
//           //res.status(409).json({ message: "Group already exists!" });
//         }
//       } else {
//         //res.status(200).json({ message: "Group Addition successful" });
//       }
//     }
//   );

//   con.query(
//     "insert into user_group (user_email, group_name) values (?, ?)",
//     [user, groupName],
//     (err, result) => {
//       if (err) {
//         console.log("Some Error1");
//         //res.status(409).json({ message: "Some error Dumbass" });
//       } else {
//         // res.status(200).json({ message: "User successfully added" });
//       }
//     }
//   );

//   for (member of members) {
//     con.query(
//       "insert into user_group (user_email, group_name) values (?, ?)",
//       [member, groupName],
//       (err, result) => {
//         if (err) {
//           console.log("Some Error2");
//           //res.status(409).json({ message: "Some error Dumbass" });
//         } else {
//           //res.status(200).json({ message: "Member successfully added" });
//         }
//       }
//     );
//   }
//   res.status(200).json({ message: "Member and Group successfully added" });
// });

app.listen(PORT, () => {
  console.log("Server connected to port 3001");
});
