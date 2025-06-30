const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ashiagarwal1234:brH7df6aO9z5b5Oz@cluster0.irnegan.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true }); // 30 seconds timeout

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  addresses: [{ street: String, city: String, country: String }],
  cart: [String], // Store cart item IDs as strings
  cardEntries: [{
    cardNumber: String,
    cardHolder: String,
    expiryDate: String,
    cvv: String
  }],
  orders: [{
    orderNumber: Number,
    items: [String], // Store item IDs as strings
    createdAt: { type: Date, default: Date.now }
  }]
});


const Users = mongoose.model('Users', userSchema);
const Pets = mongoose.model('Pets', { pname: String, pdesc: String, price: String, category: String, pimage: String });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/add-address', async (req, res) => {
  const { street, city, country } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.addresses.push({ street, city, country });
    await user.save();
    res.send({ message: 'Address added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/add-to-cart/:productId', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { productId } = req.params;

  try {
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (typeof productId !== 'string') {
      return res.status(400).send({ message: 'Invalid product ID' });
    }

    user.cart.push(productId);
    await user.save();
    res.send({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
app.post('/move-to-orders', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Directly push cart item IDs as strings to orders array
    const orderNumber = user.orders.length + 1;
    user.orders.push({ orderNumber, items: user.cart }); // Use cart item IDs directly
    await user.save();

    // Clear cart after moving items to orders
    user.cart = [];
    await user.save();

    console.log('Cart items moved to orders successfully');
    res.send({ message: 'Items moved to orders successfully' });
  } catch (error) {
    console.error('Error moving cart items to orders:', error);
    res.status(500).send({ message: 'Server error' });
  }
});




app.get('/get-addresses', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ addresses: user.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/add-pet', upload.single('pimage'), function (req, res) {
  console.log(req.file, req.body);
  const { pname, pdesc, price, category, contactNumber } = req.body;
  const pimage = req.file.path;

  const pet = new Pets({ pname, pdesc, price, category, pimage, contactNumber });
  pet.save()
    .then(() => {
      res.send({ message: 'Pet saved successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    });
});

app.get('/get-pets', (req, res) => {
  Pets.find()
    .then((result) => {
      console.log(result, "user data");
      res.send({ message: 'success', pets: result });
    })
    .catch((err) => {
      res.send({ message: 'server err' });
    });
});

app.get('/get-cart', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;
    const user = await Users.findById(userId).populate('cart');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/get-pet/:id', (req, res) => {
  console.log(req.params);
  Pets.findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result, "user data");
      res.send({ message: 'success', pet: result });
    })
    .catch((err) => {
      res.send({ message: 'server err' });
    });
});

app.post('/signup',
async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username: username, password: hashedPassword });
    await user.save();
    res.send({ message: 'saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'server err' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username: username });
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Password wrong.' });
    }
    const token = jwt.sign({ userId: user._id }, 'MYSECRETKEY', { expiresIn: '10000h' });
    res.send({ message: 'Login success.', token: token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server err' });
  }
});

app.get('/get-user', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ email: user.username });
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: 'Unauthorized' });
  }
});

app.delete('/empty-cart', async (req, res) => {
  console.log('DELETE request received at /empty-cart');
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();

    res.send({ message: 'Cart emptied successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/save-card-details', async (req, res) => {
  const { cardNumber, cardHolder, expiryDate, cvv } = req.body;
  try {
    // Check if the authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    
    // Split the authorization header to extract the token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'MYSECRETKEY');
    const userId = decoded.userId;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Create a new card entry for the user
    user.cardEntries.push({ cardNumber, cardHolder, expiryDate, cvv });
    await user.save();

    console.log("Card details saved successfully");
    res.send({ message: 'Card details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
