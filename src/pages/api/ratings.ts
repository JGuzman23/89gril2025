export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
const filePath = path.resolve('import.meta.env.RATINGS_FILE_PATH');

export const POST: APIRoute = async ({ request }) => {
  try {
    const newRating = await request.json();
    
    // Leer archivo existente
    const fileData = await fs.readFile(filePath, 'utf-8');
    const ratings = JSON.parse(fileData);
    console.log(fileData);
    
    // Insertar nueva entrada
    ratings.push(newRating);

    // Guardar el archivo actualizado
    await fs.writeFile(filePath, JSON.stringify(ratings, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, ratings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
