import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Busca automáticamente todos los archivos .schema.ts en los módulos
 */
export async function loadAllSchemas(): Promise<any[]> {
  const schemas: any[] = [];
  const srcPath = join(__dirname, '../../../');

  const directories = readdirSync(srcPath).filter(item => {
    const fullPath = join(srcPath, item);
    return statSync(fullPath).isDirectory() && item !== 'config' && item !== 'shared';
  });

  for (const dir of directories) {
    const infraPath = join(srcPath, dir, 'infrastructure');

    try {
      const files = readdirSync(infraPath);
      const schemaFiles = files.filter(file => file.endsWith('.schema.ts'));

      for (const schemaFile of schemaFiles) {
        const modulePath = join(infraPath, schemaFile);
        const module = await import(modulePath);

        Object.keys(module).forEach(exportName => {
          if (exportName.endsWith('TypeDefs')) {
            schemas.push(module[exportName]);
          }
        });
      }
    } catch (error) {
      console.log(`Skipping module ${dir}: no infrastructure found`);
    }
  }

  return schemas;
}

/**
 * Busca automáticamente todos los archivos .resolvers.ts en los módulos
 */
export async function loadAllResolvers(): Promise<any[]> {
  const resolvers: any[] = [];
  const srcPath = join(__dirname, '../../../');

  const directories = readdirSync(srcPath).filter(item => {
    const fullPath = join(srcPath, item);
    return statSync(fullPath).isDirectory() && item !== 'config' && item !== 'shared';
  });

  for (const dir of directories) {
    const infraPath = join(srcPath, dir, 'infrastructure');

    try {
      const files = readdirSync(infraPath);
      const resolverFiles = files.filter(file => file.endsWith('.resolvers.ts'));

      for (const resolverFile of resolverFiles) {
        const modulePath = join(infraPath, resolverFile);
        const module = await import(modulePath);

        Object.keys(module).forEach(exportName => {
          if (exportName.endsWith('Resolvers')) {
            resolvers.push(module[exportName]);
          }
        });
      }
    } catch (error) {
      console.log(`Skipping module ${dir}: no infrastructure found`);
    }
  }

  return resolvers;
}
