import { MongoClient } from 'mongodb';
import 'dotenv/config';

const cliente = new MongoClient(process.env.DB);

let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db('alura-websockets');
  documentosColecao = db.collection('documentos');

  console.log('Conectado ao DB com sucesso !');
} catch (error) {
  console.log('Erro ao conectar ao DB');
}

export { documentosColecao };
