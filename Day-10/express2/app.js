const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});