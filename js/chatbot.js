document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const chatbotIcon = document.querySelector('.chatbot-icon');
    
    if (!chatbotWidget || !chatbotIcon) return;
    
    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container hidden';
    chatbotContainer.innerHTML = `
        <div class="chatbot-header">
            <h3>Booking Assistant</h3>
            <button class="close-chatbot">&times;</button>
        </div>
        <div class="chatbot-messages">
            <div class="chatbot-message bot">
                <p>Hello! How can I help you with your booking today?</p>
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" placeholder="Type your message...">
            <button class="send-message">Send</button>
        </div>
    `;
    
    chatbotWidget.appendChild(chatbotContainer);
    
    // Toggle chatbot visibility
    chatbotIcon.addEventListener('click', function() {
        chatbotContainer.classList.toggle('hidden');
    });
    
    // Close chatbot
    chatbotContainer.querySelector('.close-chatbot').addEventListener('click', function() {
        chatbotContainer.classList.add('hidden');
    });
    
    // Simple chatbot responses
    const responses = {
        'hello': 'Hello there! How can I assist you with your transportation needs?',
        'hi': 'Hi! What can I help you with today?',
        'book': 'You can book a transfer by clicking on the "Book Now" button in the navigation or <a href="booking.html">click here</a>.',
        'price': 'Our standard service starts at $50 and premium service starts at $80. Prices may vary based on distance and vehicle type.',
        'contact': 'You can reach us at info@premiumtransfers.com or call +1 (555) 123-4567.',
        'help': 'I can help you with booking information, pricing, and general questions. What would you like to know?',
        'default': "I'm sorry, I didn't understand that. Could you rephrase or ask about booking, pricing, or contact information?"
    };
    
    // Handle sending messages
    const messageInput = chatbotContainer.querySelector('.chatbot-input input');
    const sendButton = chatbotContainer.querySelector('.send-message');
    const messagesContainer = chatbotContainer.querySelector('.chatbot-messages');
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;
        
        // Add user message
        addMessage(messageText, 'user');
        messageInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            // Generate bot response
            let responseText = responses.default;
            const lowerMessage = messageText.toLowerCase();
            
            for (const keyword in responses) {
                if (lowerMessage.includes(keyword)) {
                    responseText = responses[keyword];
                    break;
                }
            }
            
            // Add bot response
            addMessage(responseText, 'bot');
        }, 1000);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add some styles for the chatbot
    const style = document.createElement('style');
    style.textContent = `
        .chatbot-container {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 350px;
            max-width: 90%;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .chatbot-header {
            background: var(--secondary-color);
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chatbot-header h3 {
            margin: 0;
            font-size: 1.2rem;
        }
        
        .close-chatbot {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 5px;
        }
        
        .chatbot-messages {
            height: 300px;
            overflow-y: auto;
            padding: 15px;
            background: #f9f9f9;
        }
        
        .chatbot-message {
            margin-bottom: 15px;
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 18px;
            line-height: 1.4;
        }
        
        .chatbot-message p {
            margin: 0;
        }
        
        .chatbot-message.bot {
            background: white;
            border: 1px solid #ddd;
            border-radius: 0 18px 18px 18px;
            margin-right: auto;
        }
        
        .chatbot-message.user {
            background: var(--secondary-color);
            color: white;
            border-radius: 18px 0 18px 18px;
            margin-left: auto;
        }
        
        .chatbot-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ddd;
            background: white;
        }
        
        .chatbot-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: none;
        }
        
        .chatbot-input button {
            margin-left: 10px;
            padding: 10px 15px;
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .chatbot-input button:hover {
            background: #2980b9;
        }
        
        @media (max-width: 576px) {
            .chatbot-container {
                width: 90%;
                right: 5%;
            }
        }
    `;
    document.head.appendChild(style);
});