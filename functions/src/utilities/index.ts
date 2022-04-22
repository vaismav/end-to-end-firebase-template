import { logger } from '../firebase';

export const log = (...args: any[]) => logger.log(...args);
export const getRandomInt = (range: number) => Math.floor(Math.random() * range);
