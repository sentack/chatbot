# Chatbot

This repository contains a chatbot powered by the ChatGPT 3.5 API and implemented using Node.js. The chatbot is designed to accept questions in multiple languages, which are then translated to English using the Google Translate API. The chatbot provides answers in English only. It's just a silly chatbot made for fun :)

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

To use the chatbot, you'll need the following:

```
- Node.js installed on your machine.
- Access to the ChatGPT 3.5 API. Make sure you have the necessary API credentials.
- Make sure to use the latest version of `@vitalets/google-translate-api` npm package used for translation purposes.
```

### Installation

Clone this repository to your local machine.

Install the required dependencies by running the following command:

```
npm install
```

Set up your API credentials by creating a .env file in the root directory of the project and adding your credentials in the following format:

```
OPENAI_API_KEY=your_api_key_here
```

Replace your_api_key_here with your actual API keys.

## Usage

Start the chatbot by running the following command:

```
npm start
```

```
The chatbot will prompt you for questions. Enter your question in any language supported by Google Translate.
The chatbot will translate the question to English using the Google Translate API and provide a response in the requested language.
The chatbot will continue to provide responses until you enter "exit" to exit the program.
```

## Contributing

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, please submit bug reports or feature requests through the issue tracker.

When contributing, please adhere to the following guidelines:

```
- Fork the repository and create a new branch for your contributions.
- Make your changes and ensure they are well-documented and tested.
- Any change on the UI is appreciated :)
- Submit a pull request, describing the changes you've made.
```

## Screenshot

  <img src="screenshot.jpg" alt="screenshot" />

## License

This project is not licensed.

## Contact

If you have any questions or feedback regarding the chatbot, you can reach out to the project maintainer at [sentak16@outlook.com](mailto:email@example.com).

Thank you for using the chatbot!
