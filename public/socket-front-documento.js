import { alertarERedirecionar, atualizaTextoEditor } from './documento.js';

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

function emitirExcluirDocumento(nome) {
  socket.emit('excluir_documento', nome);
}

socket.on('excluir_documento_sucesso', (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionaDocumento, emitirExcluirDocumento };
