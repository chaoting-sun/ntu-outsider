import { message } from "antd";

export const displayStatus = (s) => {
  if (s.msg) {
    const { type, msg } = s;
    const content = { content: msg, duration: 1 };

    switch (type) {
      case "success":
        message.success(content); // show status of success
        break;
      case "error":
      default:
        message.error(content); // show status of error
        break;
    }
  }
};
