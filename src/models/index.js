// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DefaultCategories, Categories, Communications, CategoryConfiguration } = initSchema(schema);

export {
  DefaultCategories,
  Categories,
  Communications,
  CategoryConfiguration
};