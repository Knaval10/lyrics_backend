// superadminCredentials.js (in a secure place)
const bcrypt = require('bcryptjs');

// Superadmin credentials
const superadminEmail = process.env.SUPERADMIN_EMAIL;
const superadminPassword = process.env.SUPERADMIN_PASSWORD; // Change this to a strong password

// Hash the password (you can run this one time to get the hashed password)
const hashedPassword = bcrypt.hashSync(superadminPassword, 10);

module.exports = {
  superadminEmail,
  hashedPassword,
  superadminPassword
};
