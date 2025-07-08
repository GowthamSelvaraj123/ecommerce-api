const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger.json');
const connectDatabase = require('./config/db');
const path = require('path'); 


require('dotenv').config();
require('./config/passport');

connectDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get("/", (req, res) => {
    res.send("The Api Started");
})
app.use(passport.initialize());
app.use('/api/auth/', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);
app.listen(process.env.PORT, () => {
    console.log("Application Started");
    console.log('📘 Swagger at http://localhost:5000/api-docs');
})