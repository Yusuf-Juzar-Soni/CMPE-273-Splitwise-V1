const mysql = require("mysql");
const con = mysql.createConnection({
  host: "splitwisedb.ca0vnrrcatej.us-east-2.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", //user name to your my sql server
  password: "test1234",
  database: "splitwise_db",
});

let createUserGroup = (member, groupName) => {
  return new Promise((resolve, reject) => {
    con.query(
      "insert into user_group (user_email, group_name) values (?, ?)",
      [member, groupName],
      (err, result) => {
        if (err == null || err == undefined) {
          console.log("success");
          resolve(true);
        } else {
          console.log("failure");
          console.log(err);
          resolve(false);
        }
      }
    );
  });
};

let createGroups = (groupName) => {
  return new Promise((resolve, reject) => {
    con.query(
      "INSERT INTO splitwise_db.groups (group_name) VALUES ( ? )",
      [groupName],
      (err, result) => {
        if (err == null || err == undefined) {
          console.log("success(group table insert)");
          resolve(true);
        } else {
          console.log("failure(group table not inserted)");
          resolve(err);
        }
      }
    );
  });
};

async function createGroup(groupName, members, user) {
  let res = await createGroups(groupName);
  console.log(res);

  if (res == true) {
    res = await createUserGroup(user, groupName);
    console.log(res);
    if (res == true) {
      let result = false;
      for (member of members) {
        result = await createUserGroup(member, groupName);
        console.log(result);

        if (result) {
          console.log("operation success (complete operation)");
          return true;
        } else {
          console.log("operation failed (commplete operation)");
          return false;
        }
      }
    } else {
      return res;
    }
  } else {
    return res;
  }
}

module.exports = {
  createGroup,
};
