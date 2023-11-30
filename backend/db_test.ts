import pool from './db/database';

async function test() {
    try {
        const result = await pool.query('SELECT * FROM job_details');
        console.log(result.rows);
    } catch (err) {
        console.error('Error executing query:', err);
    }
}

test();