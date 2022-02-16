import { PersonCreateInput, TaskCreateInput } from ".keystone/types";

export const persons: PersonCreateInput[] = [
  { name: "Lucy Wroblewski" },
  { name: "Ches Adebayor" },
  { name: "Tiff Jayden" },
  { name: "Henrique Urrea" },
];

export const tasks: TaskCreateInput[] = [
  {
    label: "Install Keystone in local dev 🧪",
    isComplete: true,
    finishedBy: "2021-01-01T02:30:00.000Z",
    assignedTo: { connect: { name: "Lucy Wroblewski" } },
    priority: "3_high",
  },
  {
    label: "Model the content💡",
    isComplete: true,
    finishedBy: "2021-01-22T05:43:51.000Z",
    assignedTo: { connect: { name: "Ches Adebayor" } },
    priority: "3_high",
  },
  {
    label: "Architect the data schema 🔗",
    isComplete: true,
    finishedBy: "2021-02-02T20:02:37.000Z",
    assignedTo: { connect: { name: "Lucy Wroblewski" } },
    priority: "3_high",
  },
  {
    label: "Design the UI 💅🏼",
    isComplete: true,
    finishedBy: "2021-02-24T22:17:07.000Z",
    assignedTo: { connect: { name: "Tiff Jayden" } },
    priority: "2_medium",
  },
  {
    label: "Publish the content 📝",
    isComplete: true,
    finishedBy: "2021-03-01T05:41:37.000Z",
    assignedTo: { connect: { name: "Ches Adebayor" } },
    priority: "1_low",
  },
  {
    label: "Query content over GraphQL🔎",
    isComplete: false,
    assignedTo: { connect: { name: "Lucy Wroblewski" } },
    priority: "2_medium",
  },
  {
    label: "Implement the UI design in code 🖼",
    isComplete: false,
    assignedTo: { connect: { name: "Henrique Urrea" } },
    priority: "2_medium",
  },
  {
    label: "Deploy Keystone backend to the web ☁️",
    isComplete: false,
    assignedTo: { connect: { name: "Lucy Wroblewski" } },
    priority: "1_low",
  },
  {
    label: "Launch project 🚀",
    isComplete: false,
    assignedTo: { connect: { name: "Lucy Wroblewski" } },
    priority: "1_low",
  },
];
