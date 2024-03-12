import jwt from "jsonwebtoken";
import config from "./config";
import { AuthenticationError } from "./error";

// check if the request include valid cookie

export const getUserId = (cookie, UserModel) => {
  if (!cookie) {
    return null;
  }

  const fragments = cookie.split(" ");
  let token = null;

  for (let i = 0; i < fragments.length; i++) {
    if (fragments[i].startsWith("userId=")) {
      token = fragments[i].split("=")[1];
      break;
    }
  }

  if (!token) {
    return null;
  }

  const { userId } = jwt.verify(token, config.JWT_SECRET);
  const user = UserModel.findOne({ _id: userId });

  if (!user) {
    return null;
  }

  console.log("userId:", userId);
  return userId;
};
