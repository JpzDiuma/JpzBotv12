const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "ticket_menu",
    author: "Elice",

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Apenas membros com a permissão de \`ADMINISTRADOR\`, poderão utilizar este comando.`);

        message.delete();

        let embed = new Discord.MessageEmbed()
            .setAuthor("TICKET", "https://media.discordapp.net/attachments/983469119993155594/994031380637962285/SmileLogo2.png?width=676&height=676")
            .setImage("https://cdn.discordapp.com/attachments/826277688204460032/968871381238448198/SquarePainel_Ticket.png")
            .setColor("#2f3136")
            .setDescription(`Selecione no **MENU** a baixo a categoria de acordo com sua necessidade.`)


        let painel = new MessageActionRow().addComponents(new MessageSelectMenu()
            .setCustomId('menu')
            .setPlaceholder('Escolha a categoria:') // Mensagem estampada
            .addOptions([{
                    label: 'Comprar BOT',
                    description: 'Crie um canal para realizar a compra relacionada a bot',
                    emoji: '<:WaveRobot:994293987261305033>',
                    value: 'bot',
                }
            ])

        );


        message.channel.send({ embeds: [embed], components: [painel] }).then(msg => {


            const filtro = (interaction) =>
                interaction.isSelectMenu()

            const coletor = msg.createMessageComponentCollector({
                filtro
            });


            coletor.on('collect', async(collected) => {

                let ticket = collected.values[0]
                collected.deferUpdate()






                if (ticket === "bot") {

                    
                    collected.guild.channels.create(`${collected.user.username}-bot`, {
                        parent: "946840592804102165",
                        permissionOverwrites: [{
                                id: collected.user.id,
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                            },
                            {
                                id: collected.guild.roles.everyone,
                                deny: ["VIEW_CHANNEL"]
                            }
                        ],
                        type: 'text'
                    }).then(async canal => {
                        const rowclosebot = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                .setCustomId(`close-bot`)
                                .setLabel(`Fechar Ticket`)
                                .setStyle(`DANGER`)
                                .setEmoji('<a:error:934643504683049060>')
                            )
                        const embedbot = new Discord.MessageEmbed()
                            .setColor("#2f3136")
                            .setTitle("TICKET")
                            .setFooter("Aguarde até que seu TICKET seja respondido, evite marcações desnecessárias.", "https://media.discordapp.net/attachments/809442020216274944/961686760272850984/emoji_7.gif")
                            .setDescription(`<:setarosav:993302393427087391>    Seja Bem-Vindo ao seu ticket.

                            <:setarosav:993302393427087391>    Espere até que algum membro responsavel pelos tickets venha ver o seu caso.
                            
                            <:setarosav:993302393427087391>    Agradecemos pelo seu contato, lembre-se os tickets são privados e só membros da staff conseguem ver.
                            
                            <:setarosav:993302393427087391>    O seu ticket será atendido por:`);
                        canal.send({ embeds: [embedbot], components: [rowclosebot] }).then(msg => {

                            const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 })

                            collector.on('collect', i => {
                                if (i.customId === `close-bot`) {
                                    setTimeout(() => i.channel.delete())
                                }
                            })


                        })
                    })
                }

                


                        })
                    })
                }
            }
