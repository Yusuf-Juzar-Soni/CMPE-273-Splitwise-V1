const mysql = require("mysql");
const con = mysql.createConnection({
  host: "<ip of amazon rds>", // ip address of server running mysql
  user: "<add username of amazon rds>", //user name to your my sql server
  password: "<add password of your aws rds instance",// password of your instance
  database: "splitwise_db",// name of db
});

let BillAdd = (amount, billdesc, user, split_amount, group) => {
  console.log("===================");
  console.log(amount);
  console.log(billdesc);
  console.log(user);
  console.log(split_amount);
  console.log(group);
  console.log("===================");

  con.query(
    "INSERT INTO bill_table (bill_amount, bill_desc, created_by,split_amount,bill_group) VALUES (?,?,?,?,?)",
    [amount, billdesc, user, split_amount, group],
    (err, result) => {
      if (err == null || err == undefined) {
        console.log("success(Bill Added)");
        // console.log(result)
        // console.log(result.insertId);
        // return result.insertId;
      } else {
        console.log("failure(Bill Not Added)");
        console.log(err);
      }
    }
  );
};




module.exports = {
  BillAdd,
};
