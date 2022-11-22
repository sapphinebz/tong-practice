import express from "express";
import fs from "fs";

import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const app = express();
const port = 4200;

const api = express();
const apiPort = 3000;

app.get("/", (req, response) => {
  // /Users/thanaditbuthong/Applications/Node/tong
  console.log(process.cwd());
  // current working directory
  response.sendFile(`${process.cwd()}/public/index.html`);
});

app.get("/script.js", (request, response) => {
  response.sendFile(`${process.cwd()}/public/script.js`);
});

app.get("/about", (req, response) => {
  response.sendFile(`${process.cwd()}/public/about.html`);
});

app.get("/upload", (req, response) => {
  response.sendFile(`${process.cwd()}/public/upload.html`);
});

app.get("/example", (req, res) => {
  res.send("Hello Example");
});

api.options("/upload", (request, response) => {
  response.set("Access-Control-Allow-Origin", "http://localhost:4200");
  response.set(
    "Access-Control-Allow-Headers",
    "access-control-allow-origin,Content-Type,Authorization"
  );
  response.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );

  response.end();
});
api.post("/upload", upload.single("file"), (request, response) => {
  response.set("Access-Control-Allow-Origin", "http://localhost:4200");

  // const writeStream = fs.createWriteStream(
  //   `${process.cwd()}/uploads/xxxx.jpeg`
  // );

  // request.pipe(writeStream).on("finish", () => {
  response.json({ success: true });
  // });
});

api.get("/api", (request, response) => {
  response.set("Access-Control-Allow-Origin", "http://localhost:4200");

  response.json([
    {
      employeeId: 0,
      employeeName: "Thanadit",
    },
    {
      employeeId: 1,
      employeeName: "Buthong",
    },
  ]);
});

api.listen(apiPort, () => {
  console.log(`Example app listening on port ${apiPort}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
