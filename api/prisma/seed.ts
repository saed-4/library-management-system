import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Create or find the four genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  const science = await prisma.genre.upsert({
    where: { name: 'Science' },
    update: {},
    create: { name: 'Science' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History' },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' },
  });

  // Remove previously seeded books
  await prisma.book.deleteMany();

  // Insert 15 books across the four genres
  await prisma.book.createMany({
    data: [
      // Fiction
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genreId: fiction.id,
      },
      {
        title: '1984',
        author: 'George Orwell',
        genreId: fiction.id,
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genreId: fiction.id,
      },
      {
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        genreId: fiction.id,
      },

      // Science
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        genreId: science.id,
      },
      {
        title: 'The Selfish Gene',
        author: 'Richard Dawkins',
        genreId: science.id,
      },
      {
        title: 'Cosmos',
        author: 'Carl Sagan',
        genreId: science.id,
      },
      {
        title: 'Silent Spring',
        author: 'Rachel Carson',
        genreId: science.id,
      },

      // History
      {
        title: 'The Guns of August',
        author: 'Barbara Tuchman',
        genreId: history.id,
      },
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        genreId: history.id,
      },
      {
        title: 'The Silk Roads',
        author: 'Peter Frankopan',
        genreId: history.id,
      },

      // Technology
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genreId: technology.id,
      },
      {
        title: 'The Innovators',
        author: 'Walter Isaacson',
        genreId: technology.id,
      },
      {
        title: 'Code',
        author: 'Charles Petzold',
        genreId: technology.id,
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt and David Thomas',
        genreId: technology.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
