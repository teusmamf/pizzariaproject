const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routers/router_customer');
const customer_b2broutes = require('./routers/router_customer_b2b')
const app = express();

mongoose.connect('mongodb+srv://martinsmateus:wLRhG8ojzLfFPIcn@cluster0.wb5nx9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/customers', customerRoutes);
app.use('/api/customersb_b2b', customer_b2broutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
