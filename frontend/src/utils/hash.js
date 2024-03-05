import bcrypt from 'bcryptjs'


// password hashing and verifying
// ref: https://dev.to/silvenleaf/password-hashing-with-bcrypt-easiest-explanation-5gpg

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword; 
}

const verifyPassword = (password, hashedPassword) => {
  // 後端的 function
  // 後端收到前端傳來的 password 之後，將 password 和 db 中
  // 的 hashedPassword 對照來確認，回傳 boolean value
  return bcrypt.compareSync(password, hashedPassword)
}


export { hashPassword, verifyPassword };