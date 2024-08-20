import chalk from 'chalk';
import io from './server.js';

io.on('connection', (socket) => {
  console.log(chalk.greenBright('Um cliente se conectou ! ID: ', socket.id));

  socket.on('selecionar_documento', (nomeDocumento) => {
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
