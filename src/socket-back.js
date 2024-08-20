import chalk from 'chalk';
import io from './server.js';

const documentos = [
  {
    nome: 'JavaScript',
    texto: 'texto de javascript...',
  },
  {
    nome: 'Node',
    texto: 'texto de node...',
  },
  {
    nome: 'Socket.io',
    texto: 'texto de socket.io...',
  },
];

io.on('connection', (socket) => {
  console.log(chalk.greenBright('Um cliente se conectou ! ID: ', socket.id));

  socket.on('selecionar_documento', (nomeDocumento) => {
    const documento = encontrarDocumento(nomeDocumento);

    console.log(documento);

    socket.join(nomeDocumento);
  });

  socket.on('texto_editor', ({ texto, nomeDocumento }) => {
    socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
  });

  socket.on('disconnect', (motivo) => {
    console.log(
      chalk.red(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`)
    );
  });
});

function encontrarDocumento(nome) {
  const documento = documentos.find((documento) => {
    return documento.nome === nome;
  });

  return documento;
}
