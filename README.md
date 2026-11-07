# Library Management System

A library management system backend built with NestJS, PostgreSQL, and Prisma ORM.

## Technologies Used

- **NestJS** – Backend application framework.
- **PostgreSQL** – Relational database.
- **Prisma** – Database ORM and schema management.
- **TypeScript** – Programming language.

## Database Models

The database contains three main models:

- **User** – Stores user information, including email, name, and role.
- **Genre** – Stores book categories.
- **Book** – Stores book information and references its genre.

## Schema Decisions

The `Book` model references the `Genre` model through a foreign key called `genreId` instead of embedding the genre name directly inside each book.

This design uses a one-to-many relationship: one genre can have many books, while each book belongs to one genre.

There are several reasons for this decision:

1. **Avoids data duplication:** Genre names are stored once in the `Genre` table rather than repeated for every book.
2. **Maintains consistency:** If a genre name changes, it only needs to be updated in one place.
3. **Enforces data integrity:** The foreign key ensures that every book references an existing genre.
4. **Makes querying easier:** Books and their genres can be retrieved together using database joins.

The `User` model uses a `Role` enum with two possible values: `PATRON` and `LIBRARIAN`. This ensures that users can only have valid roles.

## Sample Data

The Prisma seed script inserts:

- 4 genres: Fiction, Science, History, and Technology.
- 15 sample books distributed across those genres.

## Environment Setup

1. Navigate into the `api` directory.
2. Install dependencies using `npm install`.
3. Create a `.env` file based on `.env.example`.
4. Set your PostgreSQL connection string in `.env`.
5. Apply database migrations using `npx prisma migrate dev`.
6. Generate Prisma Client using `npx prisma generate`.
7. Seed the database using `npx prisma db seed`.
8. Start the development server using `npm run start:dev`.