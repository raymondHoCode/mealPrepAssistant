import db from '../config/db.js';
import bcrypt from 'bcryptjs';

class user{
    static async createUser(email, password, name) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (email, hashedPassword, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
            [email, hashedPassword, name]
        );
        return result.rows[0];
    }

    static async getUserByEmail(email) {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    static async getUserById(id) {
        const result = await db.query(
            'SELECT id, email, name, created_at FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }
    
    static async update(id, updates) {
        const {name, email} = updates;
        const result = await db.query(
            'UPDATEE users SET name = coalesce($1, name), email = coalesce($2, email) WHERE id = $3 RETURNING id, email, name, created_at',
            [name, email, id]
        );
        return result.rows[0];
    }
    static async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query(
            'UPDATE users SET hashedPassword = $1 WHERE id = $2',
            [hashedPassword, id]
        );
    }

    static async verifyPassword(user, password) {
        return await bcrypt.compare(password, user.hashedpassword);
    }

    static async delet(id){
        await db.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        );
    }


    
}

export default user;
