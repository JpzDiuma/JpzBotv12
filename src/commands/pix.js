const Discord = require('discord.js')
const QrCodePix = require('qrcode-pix')
const config = require('../../config.json')

module.exports = {
    name: "pix",
    category: "pixxx",
    run: async (client, message, args) => {

        message.delete()
        const price = args[0]

        const retorno = new Discord.MessageEmbed()

            .setDescription('🤑 Você deve informar um **VALOR** para eu gerar um **QRCODE**')
            .setColor("#2f3136")

        if (!price) return message.channel.send(retorno).then(message => message.delete({ timeout: 10000 }))
        const Response = QrCodePix.QrCodePix({
            version: '01',
            key: config.pix.chave, //CHAVE DO PIX
            name: config.pix.nome, // SEU NOME
            city: config.pix.cidade, // CIDADE
            transactionId: '***',
            message: '', // MENSAGEM
            cep: config.pix.cep, // CEP DA PESSOA
            value: parseInt(price)
        })

        const dataR = (await Response.base64()).split(',')[1];
        const buf = Buffer.from(dataR, 'base64');
        const attachment = new Discord.MessageAttachment(buf, 'qrcode.jpeg');

        const pix = new Discord.MessageEmbed()

            .setTitle('FORMA DE PAGAMENTO: ***PIX*** <:BadgeEarlyVerifiedBotDeveloper:982025783667216464> ')
            .setDescription(`<:BadgeServerVerifiedDark:982025788075438140> Para realizar o pagamento basta apontar sua câmera para o **QRCODE** ou digitar o código a baixo:\n\n \`\`\`${Response.payload()}\`\`\`\n\n :fast_forward:  ***Nome do destinatário: ${config.pix.nome}***`)
            .setImage('attachment://qrcode.jpeg')
            .setColor("#2f3136")
            .setFooter('BY ❤️ Harry Community⚠️ Mande o Comprovante', 'https://cdn.discordapp.com/icons/955601310571442256/b12109dc1a464a6602d5c5c776248c53.webp')
            .setTimestamp()

        message.channel.send({
            files: [attachment],
            embed: pix
        })
    }
}