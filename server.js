const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = require('./models/db');
const user = require('./models/user');
const hostname = "127.0.0.1";
const port = 1907;
var user_id;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = req.method;

    if (pathname === "/") {
        fs.readFile(path.join(__dirname, "views", "index.html"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });
    } else if (pathname === "/signup.html") {
        fs.readFile(path.join(__dirname, "views", "signup.html"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });

    } else if (pathname === "/login.html") {
        fs.readFile(path.join(__dirname, "views", "login.html"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });
    }
    else if (pathname === "/vault.html") {
        fs.readFile(path.join(__dirname, "views", "vault.html"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });
    }

    else if (pathname === "/styles.css") {
        fs.readFile(path.join(__dirname, "views", "css", "styles.css"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/css");
                res.end(data);
            }
        });
    }

    else if (pathname === "/login.js") {
        fs.readFile('login.js', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/javascript");
                res.end(data);
            }
        }
        );

    }

    else if (pathname === "/signup.js") {
        fs.readFile('signup.js', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/javascript");
                res.end(data);
            }
        }
        );

    }

    else if (pathname === "/vault.js") {
        fs.readFile('vault.js', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/javascript");
                res.end(data);
            }
        }
        );
    }

    else if (pathname === "/db.js") {
        fs.readFile(path.join(__dirname, "models", "db.js"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/javascript");
                res.end(data);
            }
        });
    }

    else if (pathname === "/user.js") {
        fs.readFile(path.join(__dirname, "models", "user.js"), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/javascript");
                res.end(data);
            }
        });
    }

    else if (pathname === "/api/signup") {
        if (method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const data = JSON.parse(body);
                user.create(data, (err, success) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end("Internal Server Error");
                    } else {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ success }));
                    }
                });
            });
        } else {
            res.statusCode = 405;
            res.end("Method Not Allowed");
        }
    }
    else if (pathname === '/api/login') {
        if (method === 'POST') {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const data = JSON.parse(body);
                user.login(data, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end("Internal Server Error");
                    } else {
                        if (result) {
                            console.log(result);
                            user_id = result;
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify({ success: true, user_id: user_id }));
                        } else {
                            res.statusCode = 401;
                            res.end(JSON.stringify({ success: false }));
                        }
                    }
                });
            });
        }


        else {
            res.statusCode = 405;
            res.end("Method Not Allowed");
        }
    }

    else if (pathname === "/api/vault") {
        if (method === "GET") {
            user.getEntries(user_id, (err, entries) => {
                if (err) {
                    res.statusCode = 500;
                    res.end("Internal Server Error");
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ success: true, user_id: user_id, entries: entries }));
                }
            });
        }
        else if (method === "POST") {
            let body = "";
            console.log(user_id);
            console.log(user_id);
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const data = JSON.parse(body);
                user.addEntry(user_id, data, (err, success) => {
                    if (success) {
                        console.log(success);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ success: true, user_id: user_id }));
                    }
                    else {
                        res.statusCode = 500;
                        res.end("Internal Server Error");
                    }

                });
            });
        }

        else {
            res.statusCode = 405;
            res.end("Method Not Allowed");
        }
    }

    else if (pathname === "/api/vault/delete") {
        if (method === "DELETE") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                const { id } = JSON.parse(body);
                user.deleteEntry(id, (err, success) => {
                    if (success) {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ success: true, id: id }));
                    }
                    else {
                        res.statusCode = 500;
                        res.end("Internal Server Error");
                    }
                });
            });
        }
        else {
            res.statusCode = 405;
            res.end("Method Not Allowed");
        }
    }
});

server.listen(port);
console.log(`Server listening on port ${port}`);