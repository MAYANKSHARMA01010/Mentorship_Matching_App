const express = require('express');
const dotenv = require('dotenv');
const mentorRoutes = require('./routes/mentorRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api', mentorRoutes);
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the app`);
});
