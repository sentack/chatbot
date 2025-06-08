# 🧠 DeepSeek-R1 Chat Application

A beautiful, modern AI chat application powered by DeepSeek-R1 model with dark/light mode, code highlighting, and a responsive design.

![DeepSeek-R1 Chat App](https://placeholder.svg?height=400&width=800)

## ✨ Features

- 🌙 **Dark/Light Mode** - Beautiful theme switching with smooth transitions
- 💬 **Real-time Chat** - Instant messaging with AI responses
- 📋 **Code Detection** - Automatic code block detection with copy functionality
- 🧠 **DeepSeek-R1 Model** - Powered by the advanced DeepSeek-R1 AI model
- 📱 **Responsive Design** - Works on all devices with adaptive layout
- 🔄 **Chat History** - Save and restore chat sessions
- 🎨 **Beautiful UI** - Modern design with animations and transitions
- 📚 **About Section** - Learn about the DeepSeek-R1 model capabilities
- 🧩 **Sidebar Navigation** - Easy access to all app features

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API Key (for backend)

### Backend Setup

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/sentack/chatbot.git
   cd chatbot
   \`\`\`

2. Navigate to backend directory
   \`\`\`bash
   cd backend
   \`\`\`

3. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

4. Go to OpenRouter website and acquire your API key:
   \`\`\`
   https://openrouter.ai/
   \`\`\`

5. Create a `.env` file in the backend directory with your API key:
   \`\`\`
   OPENROUTER_API_KEY=your_api_key_here
   PORT:5000
   \`\`\`

6. Start the backend server
   \`\`\`bash
   npm run dev
   \`\`\`

The backend server will start on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Start the frontend development server
   \`\`\`bash
   npm start
   \`\`\`

The frontend application will start on http://localhost:3000

## 🔧 Usage Guide

### Chat Interface

1. **Starting a Chat**: Type your message in the input field at the bottom and press Enter or click the Send button
2. **Code Blocks**: When the AI responds with code, it will be automatically formatted with a copy button
3. **Theme Toggle**: Switch between dark and light mode using the toggle in the sidebar
4. **Sidebar Navigation**:
   - **New Chat**: Start a fresh conversation
   - **Clear Chat**: Clear the current conversation
   - **Restore Chat**: Restore the previous conversation
   - **About**: Learn about the web application

### Code Features

The application automatically detects code blocks in the AI's responses. When code is detected:

1. It's displayed in a formatted code block
2. The programming language is identified and shown
3. A copy button appears to easily copy the code
4. Proper syntax highlighting is applied

### Chat History

The application maintains two chat histories:

1. **Active Session** (chatHistory1): Your current conversation
2. **Backup Session** (chatHistory2): Your previous conversation

You can clear the current chat and restore the previous one using the sidebar navigation.

## 🛠️ Technologies Used

- **Frontend**:

  - React.js
  - TailwindCSS
  - Framer Motion
  - JavaScript (ES6+)

- **Backend**:
  - Express.js
  - Node.js
  - OpenAI SDK
  - DEEPSEEK R1 MODEL
  - OPENROUTER API KEY

## 👨‍💻 Developer

This application was developed by **Sena Takele**.

- GitHub: [https://github.com/sentack](https://github.com/sentack)
- Portfolio: [https://sentack-portfolio.vercel.app/](https://sentack-portfolio.vercel.app/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### [MADE WITH LOVE AND COFFEE BY SENTACK](https://sentack-portfolio.vercel.app/) ☕️❤️
