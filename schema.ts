import { list } from "@keystone-6/core";
import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { select } from "@keystone-6/core/fields";

export const lists = {
  Task: list({
    fields: {
      label: text({ validation: { isRequired: true } }),
      priority: select({
        type: "string",
        options: [
          { label: "Low", value: "1_low" },
          { label: "Medium", value: "2_medium" },
          { label: "High", value: "3_high" },
        ],
      }),
      isComplete: checkbox(),
      assignedTo: relationship({ ref: "Person.tasks", many: false }),
      finishedBy: timestamp(),
    },
  }),
  Person: list({
    fields: {
      name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      tasks: relationship({ ref: "Task.assignedTo", many: true }),
    },
  }),
};
