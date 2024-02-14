  Chatbot
  
  This repository contains a chatbot powered by the ChatGPT 3.5 API and implemented using Node.js. The chatbot is designed to accept questions in multiple languages, which are then translated to English using the Google Translate API. The chatbot provides answers in the user's chosen language, with support for Afan Oromo, Amharic, Tigrigna, and English (default).
  
  ## Table of Contents
  
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  
  ## Getting Started
  
  ### Prerequisites
  
  To use the chatbot, you'll need the following:
  
  - Node.js installed on your machine.
  - Access to the ChatGPT 3.5 API. Make sure you have the necessary API credentials.
  
  ### Installation
  
  1. Clone this repository to your local machine.
  2. Install the required dependencies by running the following command:
  
     ```
     npm install
     ```
  
  3. Set up your API credentials by creating a `.env` file in the root directory of the project and adding your credentials in the following format:
  
     ```
     OPENAI_API_KEY=your_api_key_here
     GOOGLE_TRANSLATE_API_KEY=your_api_key_here
     ```
  
     Replace `your_api_key_here` with your actual API keys.
  
  ## Usage
  
  1. Start the chatbot by running the following command:
  
     ```
     npm start
     ```
  
  2. The chatbot will listen for incoming questions on a specific endpoint (e.g., `http://localhost:3000/chat`).
  
  3. Send a POST request to the chatbot's endpoint with the following payload:
  
     ```json
     {
       "question": "Your question goes here",
       "language": "afan-oromo"
     }
     ```
  
     Replace `"Your question goes here"` with your actual question, and `"afan-oromo"` with the desired language code. The available language codes are: `afan-oromo`, `amharic`, `tigrigna`, and `english` (default).
  
  4. The chatbot will translate the question to English using the Google Translate API and provide a response in the requested language.
  
  ## Contributing
  
  Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, please submit bug reports or feature requests through the issue tracker.
  
  When contributing, please adhere to the following guidelines:
  - Fork the repository and create a new branch for your contributions.
  - Make your changes and ensure they are well-documented and tested.
  - Submit a pull request, describing the changes you've made.
  
  
  
  ## License
  
  This project is not licensed.
  
  ## Contact
  
  If you have any questions or feedback regarding the chatbot, you can reach out to the project maintainer at [sentak16@outlook.com](mailto:email@example.com).
  
  Thank you for using the chatbot!
