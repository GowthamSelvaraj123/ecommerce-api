const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger.json');
const connectDatabase = require('./config/db');
require('dotenv').config();
connectDatabase();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
    res.send("The Api Started");
})
app.use('/api/auth/', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/users', userRoutes);
app.listen(process.env.PORT, () => {
    console.log("Application Started");
    console.log('📘 Swagger at http://localhost:5000/api-docs');
})