import bcrypt from "bcryptjs";

// Your test password
const password = "password123";

// The stored hash from your MongoDB
const storedHash =
  "$2b$10$1BCrvJOtSlh9F19pDVks8OmhkrPs2T9rYypd8f.GvTX3S4XeMhO7O";

bcrypt.compare(password, storedHash).then((isMatch) => {
  console.log(isMatch ? "Password matches!" : "Password is incorrect!");
});
