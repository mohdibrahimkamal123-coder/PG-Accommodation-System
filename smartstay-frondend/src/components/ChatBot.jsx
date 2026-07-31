import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/chatService";
import "./ChatBot.css";

const ChatBot = () => {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hello! I'm SmartStay AI.\nHow can I help you today?"
        }
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    const handleSend = async () => {

        if (!input.trim()) return;

        const userMessage = input;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setInput("");

        setLoading(true);

        const reply = await sendMessage(userMessage);

        setLoading(false);

        setMessages(prev => [
            ...prev,
            {
                sender: "bot",
                text: reply
            }
        ]);

    };

    const handleKeyPress = (e) => {

        if (e.key === "Enter") {

            handleSend();

        }

    };

    return (

        <>

            {/* Floating Button */}

            <button

                className="chat-button"

                onClick={() => setOpen(!open)}

            >

                💬

            </button>

            {

                open && (

                    <div className="chat-container">

                        <div className="chat-header">

                            <span>🤖 SmartStay AI</span>

                            <button

                                className="close-btn"

                                onClick={() => setOpen(false)}

                            >

                                ✕

                            </button>

                        </div>

                        <div className="chat-body">

                            {

                                messages.map((msg, index) => (

                                    <div

                                        key={index}

                                        className={`message ${msg.sender}`}

                                    >

                                        {msg.text}

                                    </div>

                                ))

                            }

                            {

                                loading && (

                                    <div className="message bot">

                                        Typing...

                                    </div>

                                )

                            }

                            <div ref={messagesEndRef}></div>

                        </div>

                        <div className="chat-footer">

                            <input

                                type="text"

                                placeholder="Type your message..."

                                value={input}

                                onChange={(e) =>

                                    setInput(e.target.value)

                                }

                                onKeyDown={handleKeyPress}

                            />

                            <button

                                onClick={handleSend}

                            >

                                Send

                            </button>

                        </div>

                    </div>

                )

            }

        </>

    );

};

export default ChatBot;