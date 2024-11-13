function test(msg, cmd) {
  try {
    msg.channel.send("Recibido!");
  } catch (exception) {
    console.error(exception);
    msg.channel.send("Hubo un error al procesar tu solicitud.");
  }
}

module.exports = { test };
