import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'health_form'
    });

    await connection.execute(
      'INSERT INTO patient_login (username, password) VALUES (?, ?)',
      [username, password]
    );

    await connection.end();
    return new NextResponse("Successfully login", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error logging in", { status: 500 });
  }
}
