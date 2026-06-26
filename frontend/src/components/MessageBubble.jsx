export default function MessageBubble({ msg, onFeedback }) {
  const isBot = msg.role === "assistant" || msg.role === "bot";

  return (
    <div className={`message-row ${!isBot ? "from-user" : "from-bot"}`}>
      <div className="avatar">{!isBot ? "U" : "AI"}</div>
      <div className="bubble-container">
        <div className="bubble">
          {msg.text}
        </div>
        {isBot && msg.id && (
          <div className="feedback-actions">
            <button 
              className={`feedback-btn ${msg.feedback === "up" ? "active" : ""}`}
              onClick={() => onFeedback(msg.id, "up", msg.feedback)}
              title="Helpful"
            >
              👍
            </button>
            <button 
              className={`feedback-btn ${msg.feedback === "down" ? "active" : ""}`}
              onClick={() => onFeedback(msg.id, "down", msg.feedback)}
              title="Not helpful"
            >
              👎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
