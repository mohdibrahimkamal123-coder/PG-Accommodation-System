// src/components/ChatBot.jsx

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/chatService";
import Swal from "sweetalert2";

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
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [open]);

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

        try {
            const reply = await sendMessage(userMessage);
            setLoading(false);
            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: reply
                }
            ]);
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to get response. Please try again.',
                confirmButtonColor: '#6366f1',
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const chatStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .chatbot-floating-btn {
            position: fixed;
            bottom: 28px;
            right: 28px;
            width: 68px;
            height: 68px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            font-size: 30px;
            cursor: pointer;
            box-shadow: 0 10px 35px rgba(99, 102, 241, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: chatbotPulse 2s infinite;
        }

        @keyframes chatbotPulse {
            0% { box-shadow: 0 10px 35px rgba(99, 102, 241, 0.4); }
            50% { box-shadow: 0 10px 50px rgba(99, 102, 241, 0.6); }
            100% { box-shadow: 0 10px 35px rgba(99, 102, 241, 0.4); }
        }

        .chatbot-floating-btn:hover {
            transform: scale(1.1) rotate(-5deg);
            box-shadow: 0 15px 45px rgba(99, 102, 241, 0.5);
        }

        .chatbot-floating-btn .btn-dot {
            position: absolute;
            top: 6px;
            right: 6px;
            width: 14px;
            height: 14px;
            background: #22c55e;
            border-radius: 50%;
            border: 3px solid #ffffff;
            animation: dotPulse 1.5s infinite;
        }

        @keyframes dotPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }

        .chatbot-container {
            position: fixed;
            bottom: 110px;
            right: 28px;
            width: 400px;
            height: 580px;
            background: #ffffff;
            border-radius: 28px;
            box-shadow: 0 25px 60px rgba(15, 23, 42, 0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            z-index: 9999;
            border: 1px solid rgba(226, 232, 240, 0.8);
            animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
            from { 
                opacity: 0; 
                transform: translateY(30px) scale(0.95);
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
        }

        .chatbot-header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            padding: 18px 22px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            flex-shrink: 0;
        }

        .chatbot-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .chatbot-header-avatar {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
        }

        .chatbot-header-info {
            display: flex;
            flex-direction: column;
        }

        .chatbot-header-title {
            font-weight: 700;
            color: #ffffff;
            font-size: 1rem;
            letter-spacing: -0.02em;
        }

        .chatbot-header-status {
            font-size: 0.65rem;
            color: #94a3b8;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .chatbot-header-status .dot {
            width: 6px;
            height: 6px;
            background: #22c55e;
            border-radius: 50%;
            display: inline-block;
            animation: dotPulse 1.5s infinite;
        }

        .chatbot-close-btn {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 18px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chatbot-close-btn:hover {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            transform: rotate(90deg);
        }

        .chatbot-body {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .chatbot-body::-webkit-scrollbar {
            width: 4px;
        }

        .chatbot-body::-webkit-scrollbar-track {
            background: transparent;
        }

        .chatbot-body::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
        }

        .chatbot-body::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
        }

        .chatbot-message {
            max-width: 82%;
            padding: 12px 18px;
            margin-bottom: 8px;
            border-radius: 16px;
            word-wrap: break-word;
            line-height: 1.6;
            font-size: 0.92rem;
            font-weight: 500;
            animation: messageFade 0.3s ease;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes messageFade {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .chatbot-message.user {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .chatbot-message.bot {
            background: #ffffff;
            color: #0f172a;
            margin-right: auto;
            border-bottom-left-radius: 4px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .chatbot-message.bot .message-time {
            font-size: 0.6rem;
            color: #94a3b8;
            margin-top: 4px;
            display: block;
            font-weight: 500;
        }

        .chatbot-typing {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 18px;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            margin-right: auto;
            border-bottom-left-radius: 4px;
            max-width: 80%;
        }

        .chatbot-typing .typing-dot {
            width: 8px;
            height: 8px;
            background: #94a3b8;
            border-radius: 50%;
            animation: typingBounce 1.4s infinite;
        }

        .chatbot-typing .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .chatbot-typing .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
        }

        .chatbot-footer {
            display: flex;
            gap: 10px;
            padding: 16px 20px;
            border-top: 1px solid #f1f5f9;
            background: #ffffff;
            flex-shrink: 0;
        }

        .chatbot-footer input {
            flex: 1;
            border: 1.5px solid #e2e8f0;
            border-radius: 14px;
            padding: 12px 16px;
            outline: none;
            font-size: 0.92rem;
            font-weight: 500;
            transition: all 0.2s ease;
            background: #f8fafc;
            color: #0f172a;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .chatbot-footer input:focus {
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
        }

        .chatbot-footer input::placeholder {
            color: #94a3b8;
            font-weight: 400;
        }

        .chatbot-footer .send-btn {
            border: none;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 0 22px;
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 700;
            font-size: 0.9rem;
            font-family: 'Plus Jakarta Sans', sans-serif;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.25);
        }

        .chatbot-footer .send-btn:hover {
            transform: scale(1.04);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
        }

        .chatbot-footer .send-btn:active {
            transform: scale(0.96);
        }

        .chatbot-footer .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .chatbot-timestamp {
            text-align: center;
            font-size: 0.65rem;
            color: #94a3b8;
            padding: 4px 0 12px 0;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .chatbot-container {
                width: 92%;
                right: 4%;
                bottom: 100px;
                height: 75vh;
                border-radius: 24px;
            }

            .chatbot-floating-btn {
                width: 60px;
                height: 60px;
                font-size: 26px;
                bottom: 20px;
                right: 20px;
            }

            .chatbot-header {
                padding: 14px 18px;
            }

            .chatbot-body {
                padding: 16px;
            }

            .chatbot-message {
                max-width: 90%;
                font-size: 0.88rem;
            }

            .chatbot-footer {
                padding: 12px 16px;
                gap: 8px;
            }

            .chatbot-footer input {
                font-size: 0.88rem;
                padding: 10px 14px;
            }

            .chatbot-footer .send-btn {
                padding: 0 16px;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 480px) {
            .chatbot-container {
                width: 95%;
                right: 2.5%;
                height: 80vh;
                bottom: 90px;
                border-radius: 20px;
            }

            .chatbot-floating-btn {
                width: 56px;
                height: 56px;
                font-size: 24px;
                bottom: 16px;
                right: 16px;
            }
        }
    `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: chatStyles }} />

            {/* Floating Button */}
            <button
                className="chatbot-floating-btn"
                onClick={() => setOpen(!open)}
                title="Chat with SmartStay AI"
            >
                {open ? '✕' : '💬'}
                {!open && <span className="btn-dot"></span>}
            </button>

            {/* Chat Window */}
            {open && (
                <div className="chatbot-container">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-left">
                            <div className="chatbot-header-avatar">🤖</div>
                            <div className="chatbot-header-info">
                                <span className="chatbot-header-title">SmartStay AI</span>
                                <span className="chatbot-header-status">
                                    <span className="dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button
                            className="chatbot-close-btn"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-body">
                        <div className="chatbot-timestamp">
                            {new Date().toLocaleString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${msg.sender}`}
                            >
                                {msg.text}
                                {msg.sender === 'bot' && (
                                    <span className="message-time">Just now</span>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="chatbot-typing">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        )}

                        <div ref={messagesEndRef}></div>
                    </div>

                    {/* Footer */}
                    <div className="chatbot-footer">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={loading}
                        />
                        <button
                            className="send-btn"
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                        >
                            {loading ? '...' : 'Send'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;