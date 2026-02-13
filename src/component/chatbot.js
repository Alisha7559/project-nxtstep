import "./chat.css";

const Chatbot = () => {
  return (
   <div className="chat-wrapper">
  <div className="chat-container">
    <div className="chat-box">
      <div className="bot">Hello! How can I help you?</div>
    </div>

    <input type="text" placeholder="Type your message..." />
  </div>
</div>

  );
};

export default Chatbot;
