const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const viewsDir = path.join(__dirname, "views");
app.use(express.static(viewsDir));

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./images")));

const PORT = 4000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
console.log(viewsDir);

app.get("/", (req, res) => {
  // Send the HTML form to the client
  res.sendFile(path.join(viewsDir, "resQR_registration.html"));
});

app.post("/process-form", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 302;
  res.setHeader("Location", "/");
  return res.end();
});

app.post("/generate_qr", (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.resQR_User) {
      return res
        .status(400)
        .json({ error: "Invalid or missing data in the request body." });
    }

    // Access the properties within the "resQR_User" object
    const ownerData = data.resQR_User;

    // Convert the ownerData to a string
    const jsonData = JSON.stringify(ownerData);

    QRCode.toFile(path.join(__dirname, "qrcode.png"), jsonData, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const qrCodePath = path.join(__dirname, "qrcode.png");
      res.sendFile(qrCodePath);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
