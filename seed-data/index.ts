import { Context } from ".keystone/types";
import { persons, tasks } from "./data";

export async function insertSeedData(context: Context) {
  console.log(`🌱 Inserting seed data`);

  const existingPeople = await context.query.Person.findMany({
    where: { name: { in: persons.map(({ name }) => name) } },
    query: "name",
  });

  let peopleSet = new Set(existingPeople.map(({ name }) => name));

  await context.query.Person.createMany({
    data: persons.filter(({ name }) => !peopleSet.has(name)),
  });

  await context.query.Task.createMany({ data: tasks });

  console.log(`✅ Seed data inserted`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
