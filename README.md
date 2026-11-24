# Employee Onboarding Application

## Project Overview

The **Employee Onboarding Application** is a form-based web application developed using Angular 22 and Signal Forms. It allows users to enter and validate employee information through a structured onboarding form.

The application includes personal details, employment information, address details, and skills with interactive star ratings. It implements synchronous and asynchronous validation to ensure that the submitted information is accurate and complete.

## Technologies Used

- **Frontend Framework:** Angular 22
- **Programming Language:** TypeScript
- **Form Management:** Angular Signal Forms (`@angular/forms/signals`)
- **UI:** HTML, SCSS
- **HTTP Communication:** Angular HttpClient
- **HTTP Interception:** Functional HTTP Interceptor
- **Reactive Programming:** RxJS
- **Development Environment:** Visual Studio Code
- **Runtime:** Node.js
- **Package Manager:** npm

## Features and Functionalities

### 1. Personal Details
- First name and last name validation.
- Email format validation.
- Asynchronous email availability checking.
- Phone number validation (10 digits, starting with 6–9).
- Date of birth validation to ensure the employee is at least 18 years old on the joining date.

### 2. Employment Details
- Employment types: Full-time, Contract, and Intern.
- Department selection: Engineering, Design, and HR.
- Dynamic designation options based on the selected department.
- Designation is cleared when the department changes.
- Joining date validation.
- Conditional end date field for Contract and Intern employees.
- End date must be later than the joining date.
- Manager email validation.
- Manager email must be different from the employee email.

### 3. Address Details
- Address line and city validation.
- PIN code validation.
- PIN code must contain six digits and cannot start with zero.

### 4. Skills Management
- Add and remove employee skills.
- Minimum of two and maximum of six skills.
- Skill names are required.
- Duplicate skill names are not allowed (case-insensitive).
- Interactive five-star rating component for each skill.

### 5. Asynchronous Email Validation
- Uses Angular HttpClient and a functional HTTP interceptor.
- Simulates an email availability API endpoint:
  `/api/check-email?email=...`
- Displays a checking indicator while validation is in progress.
- Identifies already-registered email addresses.
- Simulates an 800 ms response delay.

The following email addresses are configured as already registered:
- admin@company.com
- hr@company.com

### 6. Form Submission
- Submit button is enabled only when the form is valid and no validation is pending.
- Displays a success message after successful submission.
- Displays the employee's full name in the success message.
- Resets the form after successful submission.

## Angular Concepts Implemented

- Standalone components.
- Angular Signals.
- Angular Signal Forms.
- `form()` API and `[formField]` directive.
- Built-in and custom validation.
- Conditional validation.
- Asynchronous validation using `validateHttp()`.
- Functional HTTP interceptors.
- Reusable custom components.
- Dynamic form fields.
- Reactive state management using signals.

## Project Setup and Installation

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Angular CLI
- Visual Studio Code

### 1. Clone or Download the Project

Download the project or clone the repository.

### 2. Open the Project Folder

Open the project directory in Visual Studio Code or Command Prompt.

### 3. Install Dependencies

Run:

```bash
npm install
```

### 4. Start the Development Server

Run:

```bash
ng serve --open
```

Alternatively, on Windows:

```cmd
ng.cmd serve --open
```

The application will be available at:

`http://localhost:4200/`

### 5. Build the Application

Run:

```bash
ng build
```

The production build will be generated inside the `dist` directory.

## Testing and Validation

The following functionalities were tested:

- Required field validation.
- Invalid email format validation.
- Duplicate email detection.
- Phone number validation.
- Minimum employee age validation.
- Department and designation dependency.
- Employment type-based end date visibility.
- End date validation.
- Manager email validation.
- Address and PIN code validation.
- Duplicate skill detection.
- Minimum and maximum skill limits.
- Individual star ratings.
- Successful form submission.
- Success message and form reset.

## Screenshots

Screenshots demonstrating the application's interface, validation messages, and successful form submission are included in the project submission.

## Conclusion

The Employee Onboarding Application demonstrates the use of Angular 22 Signal Forms to build a structured, dynamic, and validated employee onboarding form. It incorporates reusable components, custom validation, asynchronous email checking, and reactive state management using Angular Signals.
