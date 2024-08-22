import { MongoClient } from 'mongodb';

const cliente = new MongoClient(
  'mongodb+srv://alura:123@aluracluester.s43zi.mongodb.net/?retryWrites=true&w=majority&appName=AluraCluester'
);

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
