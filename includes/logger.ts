import * as fs from 'fs';

const logger = fs.createWriteStream('/tmp/log.txt', {
  flags: 'a',
});

export const log = (...params: any) => {
  logger.write(JSON.stringify(params) + '\n\r');
};
