import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const weight = formData.get('weight');
    const height = formData.get('height');
    const bloodPressure = formData.get('bloodPressure');
    const bloodSugar = formData.get('bloodSugar');
    const cholesterol = formData.get('cholesterol');
    const gout = formData.get('gout');

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'health_form'
    });

    const [result] = await connection.execute(
      'INSERT INTO patient_data (weight, height, bloodPressure, bloodSugar, cholesterol, gout) VALUES (?, ?, ?, ?, ?, ?)',
      [weight, height, bloodPressure, bloodSugar, cholesterol, gout]
    );

    await connection.end();
    return new NextResponse("Successfully submit patient data", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error submitting patient data", { status: 500 });
  }
}
