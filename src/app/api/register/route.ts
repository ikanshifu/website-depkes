import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const username = formData.get('username');
    const password = formData.get('password');
    const cpassword = formData.get('cpassword');

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'health_form'
    });

    await connection.execute(
      'INSERT INTO patient_register (first_name, last_name, email, phone, username, password, cpassword) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, username, password, cpassword]
    );

    await connection.end();
    return new NextResponse("Your account has been successfully created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating account", { status: 500 });
  }
}
