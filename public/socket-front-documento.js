import { atualizaTextoEditor } from './documento.js';

const socket = io();

function selecionaDocumento(nome) {
  socket.emit('selecionar_documento', nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit('texto_editor', dados);
}

socket.on('texto_editor_clientes', (texto) => {
  atualizaTextoEditor(texto);
});

socket.on('disconnect', (motivo) => {
  console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});

socket.on('documento_existente', (nome) => {
  console.log(`O documento ${nome} já existe!`);
});

export { emitirTextoEditor, selecionaDocumento };
