import { mergeResolvers } from '@graphql-tools/merge';
import { baseResolvers } from './base';
import { healthResolvers } from './health';
import { loadAllResolvers } from '../utils/moduleLoader';

export async function createResolvers() {
  const moduleResolvers = await loadAllResolvers();

  return mergeResolvers([
    baseResolvers,
    healthResolvers,
    ...moduleResolvers,
  ]);
}
