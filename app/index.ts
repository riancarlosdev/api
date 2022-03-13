import { config } from 'dotenv';
import App from './app';

config();

new App().initialServer(false);
