import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./AskAIChat.css";

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="code-copy-btn" onClick={handleCopy}>
      {copied ? "✓ Copied!" : "📋 Copy"}
    </button>
  );
};

const AskAIChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const python = import.meta.env.VITE_PYTHON_URL;

  const handleSend = async (e) => {
    e.preventDefault();
    if (chatInput.trim() === "" || loading) return;
    const user = JSON.parse(localStorage.getItem("user"))||{};
    setMessages(prev => [...prev, { sender: "user", text: chatInput }]);
    const currentInput = chatInput;
    setChatInput("");
    setLoading(true);
    try {
      const resp = await fetch(python + "ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentInput, user_id: user?.id })
      });
      const data = await resp.json();
      if (data.success) {
        toast.info("+5XP Added!🎉")
        if(data.passed>0){
            toast.info(`Wohoo! Level ${data.passed+1} Reached🎉`);
        }
        setMessages(prev => [...prev, { sender: "AI", text: data.answer }]);
      }
    } catch (err) {
      console.log(err);
      toast.error('AI is busy Sleeping.');
    }
    setLoading(false);
  };

  const renderMessage = (text, sender) => {
    if (sender === "user") return <span>{text}</span>;

    return (
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && (match || codeString.includes("\n"))) {
              return (
                <div className="code-block-wrapper">
                  <div className="code-block-header">
                    <span className="code-lang">{match ? match[1] : "code"}</span>
                    <CopyButton code={codeString} />
                  </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match ? match[1] : "text"}
                    PreTag="div"
                    customStyle={{ margin: 0, borderRadius: "0 0 8px 8px", fontSize: "0.82rem" }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <>
      <button
        className="askai-fab"
        onClick={() => setShowChat(true)}
      >
        <span role="img" aria-label="ai">🤖</span> Ask AI
      </button>
      {showChat && (
        <div className="askai-chatbox-overlay" onClick={() => setShowChat(false)}>
          <div className="askai-chatbox" onClick={e => e.stopPropagation()}>
            <div className="askai-chatbox-header">
              <span>NeuraLearn AI Chat</span>
              <button className="askai-chatbox-close" onClick={() => setShowChat(false)}>×</button>
            </div>
            <div className="askai-chatbox-body">
              <div className="askai-messages">
                {messages.length === 0 && (
                  <p style={{ color: "#888", textAlign: "center" }}>Start the conversation!</p>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={msg.sender === "user" ? "askai-message user" : "askai-message ai"}
                  >
                    {renderMessage(msg.text, msg.sender)}
                  </div>
                ))}
                {loading && (
                  <div className="askai-message ai">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
              </div>
              <form className="askai-chatbox-input-row" onSubmit={handleSend}>
                <input
                  className="askai-chatbox-input"
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  autoFocus
                  disabled={loading}
                />
                <button className="askai-chatbox-send" type="submit" disabled={loading}>
                  {loading ? "..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskAIChat;