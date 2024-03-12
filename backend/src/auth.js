import jwt from "jsonwebtoken";
import config from "./config";
import { AuthenticationError } from "./error";

// check if the request include valid cookie

export const getUserId = (cookie, UserModel) => {
  if (!cookie) {
    throw new AuthenticationError("Not authenticated.");
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
    throw new AuthenticationError("Not authenticated.");
  }

  const { userId } = jwt.verify(token, config.JWT_SECRET);
  const user = UserModel.findOne({ _id: userId });

  if (!user) {
    throw new AuthenticationError("Not authenticated.");
  }

  console.log("userId:", userId);
  return userId;
};
