// This file is only created to be run once so hash all passwords up till password hashing was implemented

const db = require("./databaseConfig");
const bcrypt = require('bcryptjs')

//Connects
var dbConn = db.getConnection();
dbConn.connect(function (err) {
    if (err) {
        console.log(err)
    return;
    } else {
    //Sql query
    dbConn.query(`SELECT username, password FROM user`, [], function (err, results) {

        if (err) {
            console.log(err);
            return;
        }
        var username = [];
        var passwords = [];
        for (var entry of results) {

            // Bcrypt hash the password
            var salt = bcrypt.genSaltSync(10);
            var password = bcrypt.hashSync(entry.password, salt);

            username.push(entry.username);
            passwords.push(password);
        }
        for (let i=0; i<results.length; i++) {
            dbConn.query(`UPDATE user SET password = ? WHERE username = ?`, [passwords[i], username[i]], function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
            })
        }
        //End connection
        dbConn.end();
        return;
    });
    }
});