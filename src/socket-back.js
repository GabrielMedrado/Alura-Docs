import chalk from 'chalk';
import io from './server.js';

import { atualizaDocumento, encontrarDocumento } from './documentosDb.js';

io.on('connection', (socket) => {
  console.log(chalk.greenBright('Um cliente se conectou ! ID: ', socket.id));

  socket.on('selecionar_documento', async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on('texto_editor', async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
    }
  });

  socket.on('disconnect', (motivo) => {
    console.log(
      chalk.red(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`)
    );
  });
});
