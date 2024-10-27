# Rule Evaluator - Frontend

This is the frontend of the Rule Evaluator application, built with React and ShadCN UI. It allows users to select a rule from a dropdown and dynamically input the required fields for rule evaluation.

## Features

- **Dynamic Rule Selection**: Users can select from a list of predefined rules using ShadCN's `Select` component.
- **Auto-generated Forms**: Based on the selected rule, input fields for all necessary parameters are generated automatically.
- **Form Validation**: Ensures all fields are filled in before allowing rule evaluation.
- **Dark Theme**: A customizable dark theme with background, primary, and secondary colors.
- **API Integration**: Connects to a backend API to evaluate the rule with user-provided data.

## Tech Stack

- **React**: Frontend framework
- **Tailwind CSS**: For styling and responsive design
- **ShadCN UI**: For the dropdown and other UI components
- **Vite**: Development environment and build tool

## Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/ayushman075/ruli-frontend
   cd ruli-frontend

2. Install dependencies and run locally.
   ```bash
   npm install
   npm run dev

The Rule Evaluator project provides a complete solution for dynamically evaluating complex rule-based conditions through a modern web interface and a robust backend API. The frontend, built with React and styled using Tailwind CSS and ShadCN UI components, offers an intuitive user experience with dynamic form generation based on rule selection. The backend, powered by Node.js and Express, efficiently processes rule evaluations to provide real-time feedback.

With straightforward setup steps for both frontend and backend, this project is easily customizable and extendable, making it a versatile tool for various use cases where rule-based evaluations are required. Whether you're developing an internal tool for data validation or building a more sophisticated rule engine, this project serves as a solid foundation for further development.

Feel free to contribute, suggest improvements, or customize the project according to your specific requirements!
