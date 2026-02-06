# Contacts Node Backend

> 📚 **Note:** This is a study project developed to explore and apply software engineering best practices, design patterns, and modern backend technologies.

Backend for contact management, developed with a focus on performance, scalability, and the application of **SOLID** principles.

## 🚀 Features

The project offers a complete RESTful API for contact management:

- **Create Contact**: Register new contacts with name, surname, and phone number.
- **List Contacts**: Retrieve all stored contacts.
- **Contact Details**: Fetch a specific contact by ID.
- **Update Contact**: Edit existing contact information.
- **Delete Contact**: Securely remove records.

## 🛠 Technologies Used

The main technologies and tools used in this project include:

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Web Framework**: [Fastify](https://fastify.dev/) (focused on high performance and low overhead)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/) (with PostgreSQL Adapter)
- **Testing**: [Vitest](https://vitest.dev/)
- **Code Quality**: [ESLint](https://eslint.org/), [Husky](https://typicode.github.io/husky/) and lint-staged
- **Build**: [tsup](https://tsup.egoist.dev/)
- **Deploy**: [Vercel](https://vercel.com/)

## 🏛 Architecture and Design Patterns

The project was structured following **SOLID** principles and **Clean Architecture** to ensure maintainability and decoupling:

### Design Patterns
- **Repository Pattern**: Abstraction of the data access layer. `ContactRepository` is an interface, allowing the implementation (built with Prisma in `PrismaContactRepository`) to be easily swapped or mocked for testing.
- **Dependency Inversion Principle (DIP)**: High-level layers depend on abstractions (interfaces), not on concrete low-level implementations.
- **Dependency Injection**: Used to inject necessary dependencies into controllers and services.

### Folder Structure (`src/`)
- `controllers/`: Manages HTTP requests, input validation, and responses.
- `services/`: Contains pure business logic, framework-agnostic.
- `repositories/`:
  - `ContactRepository.ts`: Interface defining the data access contract.
  - `prisma/`: Concrete implementation of the repository using Prisma.
- `models/`: Domain definitions and types.
- `routes.ts`: API route definitions.
