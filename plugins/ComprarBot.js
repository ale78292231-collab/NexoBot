const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
};
handler.command ='comprarbot',/^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

global.ComprarBot = `
〔 *TIPOS DE COMPRA* 〕

*BOT PARA GRUPO* :
> wa.me/50378630152

*BOT PERZONALIZADO* :
> wa.me/51900922660
`;