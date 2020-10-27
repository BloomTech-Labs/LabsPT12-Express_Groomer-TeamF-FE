import { isDevelopment } from './env';

export const log = message => {
  if (isDevelopment) console.log(message);
};
