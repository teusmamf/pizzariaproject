const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routers/router_customer');
const customer_b2broutes = require('./routers/router_customer_b2b');
const company_routes = require('./routers/router_company');
require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/customers', customerRoutes);
app.use('/api/customersb_b2b', customer_b2broutes);
app.use('/api/companies',company_routes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
