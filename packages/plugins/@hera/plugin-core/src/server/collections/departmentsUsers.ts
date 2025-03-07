import { defineCollection } from '@tachybase/database';

export default defineCollection({
  name: 'departmentsUsers',
  dumpRules: 'required',
  fields: [
    {
      type: 'boolean',
      name: 'isOwner',
      // Weather the user is the owner of the department
      allowNull: false,
      defaultValue: false,
    },
    {
      type: 'boolean',
      name: 'isMain',
      // Weather this is the main department of the user
      allowNull: false,
      defaultValue: false,
    },
  ],
});
