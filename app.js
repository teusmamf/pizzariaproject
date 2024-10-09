const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routers/router_customer');
const customer_b2broutes = require('./routers/router_customer_b2b');
const company_routes = require('./routers/router_company');
const user_finance_routes = require('./routers/router_user_finance');
const user_kitchen = require('./routers/router_user_kitchen');
const auth_routes = require('./routers/router_auth');
const authenticateToken = require('./middleware/middleware_auth');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', createProxyMiddleware({ 
    target: 'http://127.0.0.1:5500/', 
    changeOrigin: true,
}));
app.use(bodyParser.json());
app.use('/api/customers',  authenticateToken ,customerRoutes);
app.use('/api/customersb_b2b' ,customer_b2broutes);
app.use('/api/companies', authenticateToken ,company_routes);
app.use('/api/users_finance', authenticateToken ,user_finance_routes);
app.use('/api/user_kitchen', authenticateToken ,user_kitchen);
app.use('/api/auth', auth_routes);

app.listen(8080, () => {
    console.log('Server is running on port 3000');
});
