import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});  

async function runMigrations() {
    const client = await pool.connect();
    try {
        console.log('Running migrations...');

        const schemaPath = path.join(__dirname, '../config/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
        await client.query(schemaSql);
        
        console.log('Migrations completed successfully.');
        console.log('Database schema has been set up.');
        console.log(' - users');
        console.log(' - user_preferences');
        console.log(' - pantry_items');
        console.log(' - recipes');
        console.log(' - recipe_ingredients');
        console.log(' - recipe_nutrition');
        console.log(' - meal_plans');
        console.log(' - shopping_list_items');

    } catch (err) {
        console.error('Error running migrations:', err);
        process.exit(1);
    } finally { 
        client.release();
        await pool.end();
    }
    

    }

    runMigrations();