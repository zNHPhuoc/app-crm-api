// .docker/mongo/mongo-init.js
db = db.getSiblingDB("admin");

const user = db.getUser("root");
if (!user) {
  db.createUser({
    user: "root",
    pwd: "secret123",
    roles: [{ role: "root", db: "admin" }],
  });
}

try {
  rs.initiate({
    _id: "rs0",
    members: [{ _id: 0, host: "nest_mongo:27017" }]
  });
} catch (e) {
  print("ReplicaSet may already be initialized or failed:", e.message);
}
