const path = require("path");

const express = require("express");

const app = express();

// Init Middleware
app.use(express.json());

app.use("/api/data", require("./backend/routes/dataRoutes"));

// Serve static assets in production
// Set static folder
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
