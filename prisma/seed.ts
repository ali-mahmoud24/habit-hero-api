import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with faker data...');

  // Clear old data
  await prisma.habitLog.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.user.deleteMany();

  // Seed fixed demo user
  const demoPassword = await bcrypt.hash('demo1234', 10);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: demoPassword,
      firstName: 'Demo',
      lastName: 'User',
      role: 'USER',
    },
  });

  // Seed random users
  for (let i = 0; i < 5; i++) {
    const password = await bcrypt.hash('password', 10);

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        password,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: 'USER',
      },
    });

    // Each user gets 2–4 habits
    const habitCount = faker.number.int({ min: 2, max: 4 });
    for (let j = 0; j < habitCount; j++) {
      const habit = await prisma.habit.create({
        data: {
          title: faker.helpers.arrayElement([
            'Drink Water',
            'Exercise',
            'Read 10 Pages',
            'Meditate',
            'Sleep Early',
            'Learn Coding',
          ]),
          userId: user.id,
        },
      });

      // Generate habit logs for the last 7 days
      for (let k = 0; k < 7; k++) {
        const date = faker.date.recent({ days: 7 });
        await prisma.habitLog.create({
          data: {
            habitId: habit.id,
            completed: faker.datatype.boolean(),
            date,
          },
        });
      }
    }
  }

  console.log('✅ Seeding with faker completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
