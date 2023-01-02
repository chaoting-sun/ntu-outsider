import bcrypt from 'bcryptjs'


// password hashing and verifying
// ref: https://dev.to/silvenleaf/password-hashing-with-bcrypt-easiest-explanation-5gpg

/* hash password */
const hashPassword = (password) => {
  // 前端的 function
  // 前端傳加密過後的 password (hashedPassword) 到後端並儲存在 db
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

/* verify password */
const verifyPassword = (password, hashedPassword) => {
  // 後端的 function
  // 後端收到前端傳來的 password 之後，將 password 和 db 中
  // 的 hashedPassword 對照來確認，回傳 boolean value
  bcrypt.compareSync(password, hashedPassword)
}


export { hashPassword, verifyPassword };