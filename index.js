// require your server and launch it here
require('dotenv').config();
const server = require('./api/server');
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}\n`);
})
