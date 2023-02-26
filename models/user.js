const db = require("./db");

exports.create = (user, callback) => {
    db.run(
        "INSERT INTO users (email, password, name, phone) VALUES (?,?,?,?)",
        user.email,
        user.password,
        user.name,
        user.phone,
        (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, true);
        }
    );
};

exports.findByEmail = (email, callback) => {
    db.get("SELECT * FROM users WHERE email = ?", email, (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

exports.login = (data, callback) => {
    const email = data.email;
    const password = data.password;
    var user_id = 0;

    db.get("SELECT * FROM users WHERE email = ?", email, (err, row) => {
        if (err) {
            return callback(err);
        }
        if (!row) {
            return callback(null, false);
        }
        if (row.password !== password) {
            return callback(null, false);
        }
        user_id = row.id;
        console.log("user file user_id: " + user_id);
        callback(null, user_id);

    });
};

exports.addEntry = (user_id, entry, callback) => {
    const name = entry.name;
    const username = entry.username;
    const password = entry.password;
    const site = entry.site;
    const id = user_id;

    db.run(
        "INSERT INTO entries (name, username, password, site, user_id) VALUES (?,?,?,?,?)",
        name,
        username,
        password,
        site,
        id,
        (err) => {
            if (err) {
                return callback(err);
            }
            console.log("Entry added to the database");
            callback(null, true);
        }
    );
};

exports.getEntries = (user_id, callback) => {
    db.all("SELECT * FROM entries WHERE user_id = ?", user_id, (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.deleteEntry = (id, callback) => {
    db.run("DELETE FROM entries WHERE id = ?", id, (err) => {
        if (err) {
            return callback(err);
        }
        callback(null, true);
    });
};
