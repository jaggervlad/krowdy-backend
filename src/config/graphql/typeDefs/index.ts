import { mergeTypeDefs } from '@graphql-tools/merge';
import { baseTypeDefs } from './base';
import { healthTypeDefs } from './health';
import { loadAllSchemas } from '../utils/moduleLoader';

export async function createTypeDefs() {
  const moduleSchemas = await loadAllSchemas();

  return mergeTypeDefs([
    baseTypeDefs,
    healthTypeDefs,
    ...moduleSchemas,
  ]);
}
