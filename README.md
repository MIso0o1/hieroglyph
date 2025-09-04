# Hieroglyph Translator

## Overview

The Hieroglyph Translator is a web application built with React that allows users to convert modern text into ancient Egyptian hieroglyphs. It provides an interactive experience with draggable hieroglyph cards and a visually rich interface inspired by ancient Egypt.

## Features

*   **Text to Hieroglyph Translation:** Input text and see it transformed into corresponding hieroglyphic representations.
*   **Interactive Draggable Cards:** Hieroglyph cards can be dragged and arranged by the user, offering a playful way to compose messages.
*   **Visually Immersive Interface:** Features Egyptian-themed backgrounds, patterns, and animations to enhance the user experience.
*   **Responsive Design:** Optimized for various screen sizes, including mobile.

## Technologies Used

*   **Frontend:** React, Vite
*   **Styling:** Tailwind CSS, Radix UI
*   **Animation:** Framer Motion
*   **State Management:** React Hooks

## Setup and Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd hieroglyph-translator
    ```

2.  **Install dependencies:**

    The project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it via npm:

    ```bash
    npm install -g pnpm
    ```

    Then, install the project dependencies:

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    This will start the development server, usually at `http://localhost:5173`.

4.  **Build for production:**

    To create a production-ready build, run:

    ```bash
    pnpm build
    ```

    The build artifacts will be located in the `dist/` directory.

## Project Structure

```
hieroglyph-translator/
├── public/
│   └── assets/             # Static assets like backgrounds and favicons
├── src/
│   ├── assets/             # React SVG icon
│   ├── components/         # Reusable React components (e.g., TranslationBar, DraggableCardsSection)
│   │   └── ui/             # UI components from Radix UI/Shadcn UI
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, including hieroglyphMapping.js
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global CSS styles
│   └── main.jsx            # Entry point of the React application
├── .eslintrc.js            # ESLint configuration
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
└── vite.config.js          # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## License

This project is open-source and available under the MIT License.

