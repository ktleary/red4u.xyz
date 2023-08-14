import * as React from "react";

const messageStyle = {
  color: "#fff59d",
  fontSize: 20,
  fontWeight: "bold",
};

interface Props {
  message: string;
}

// const Message = ({ message }) => (
const Message = ({ message }: Props) => (
  <div style={messageStyle}>{message}</div>
);

export default Message;
