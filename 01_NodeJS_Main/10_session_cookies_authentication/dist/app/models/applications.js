import { getDb } from '../../config/database.js';
export class Application {
    static db = getDb();
}
