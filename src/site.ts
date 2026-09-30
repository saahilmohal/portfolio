// Reads src/content/site.yaml so every page shares the same settings.
import YAML from 'yaml';
import raw from './content/site.yaml?raw';
export const site = YAML.parse(raw);
