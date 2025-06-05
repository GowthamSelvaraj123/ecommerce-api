 <h1>🛒 E-Commerce API</h1>
  <p>This is a RESTful API backend for an E-Commerce application built using <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong> with <strong>Mongoose</strong>.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>User Authentication (JWT-based)</li>
    <li>Role-based access control</li>
    <li>Product CRUD operations</li>
    <li>Shopping Cart support</li>
    <li>Order placement & tracking</li>
    <li>Secure API routes</li>
  </ul>

  <h2>🧰 Tech Stack</h2>
  <ul>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB + Mongoose</li>
    <li><strong>Auth:</strong> JWT (JSON Web Tokens)</li>
    <li><strong>Other:</strong> dotenv, bcrypt, cors, nodemon</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre>
ecommerce-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
├── app.js
├── package.json
└── README.html
  </pre>

  <h2>🔧 Installation</h2>
  <ol>
    <li>Clone the repository:
      <div class="code-block"><code>git clone https://github.com/yourusername/ecommerce-api.git</code></div>
    </li>
    <li>Install dependencies:
      <div class="code-block"><code>npm install</code></div>
    </li>
    <li>Create a <code>.env</code> file:
      <div class="code-block">
<pre>
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
</pre>
      </div>
    </li>
    <li>Start the server:
      <div class="code-block"><code>npm run dev</code></div>
    </li>
  </ol>

  <h2>🛠️ API Endpoints</h2>

  <h3>Auth</h3>
  <ul>
    <li><code>POST /api/auth/register</code> - Register a new user</li>
    <li><code>POST /api/auth/login</code> - Login and receive token</li>
  </ul>

  <h3>Products</h3>
  <ul>
    <li><code>GET /api/products</code> - List products</li>
    <li><code>POST /api/products</code> - Add product (Admin)</li>
    <li><code>PUT /api/products/:id</code> - Update product (Admin)</li>
    <li><code>DELETE /api/products/:id</code> - Delete product (Admin)</li>
  </ul>

  <h3>Cart</h3>
  <ul>
    <li><code>GET /api/cart</code> - Get user cart</li>
    <li><code>POST /api/cart</code> - Add item to cart</li>
    <li><code>PUT /api/cart/:itemId</code> - Update item quantity</li>
    <li><code>DELETE /api/cart/:itemId</code> - Remove item</li>
  </ul>

  <h3>Orders</h3>
  <ul>
    <li><code>POST /api/orders</code> - Place an order</li>
    <li><code>GET /api/orders</code> - Get user orders</li>
  </ul>

  <h2>🔒 Authentication</h2>
  <p>Protected routes use JWT. Admin privileges are required for certain routes.</p>

  <h2>📌 To-Do</h2>
  <ul>
    <li>Payment integration</li>
    <li>Image upload with Cloudinary or similar</li>
    <li>Email notifications</li>
    <li>Admin dashboard (optional)</li>
  </ul>

  <h2>👨‍💻 Author</h2>
  <p><strong>Gowtham Developer</strong></p>

  <h2>📄 License</h2>
  <p>This project is licensed under the <strong>MIT License</strong>.</p>
