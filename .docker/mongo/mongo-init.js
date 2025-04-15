// mongo-init.js
db = db.getSiblingDB("admin");

const user = db.getUser("root");

if (!user) {
  db.createUser({
    user: "root",
    pwd: "secret123",
    roles: [{ role: "root", db: "admin" }],
  });
}

rs.initiate();

