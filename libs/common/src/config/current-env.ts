import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

const environment = process.env.NODE_ENV;
const configFile = path.join(
  __dirname,
  '../configurations',
  `${environment}.yml`,
);

if (!fs.existsSync(configFile)) {
  throw new Error(`Config file ${configFile} not found.`);
}

export const currentEnvironmentConfigFile = () => {
  return yaml.load(fs.readFileSync(configFile, 'utf8'));
};
