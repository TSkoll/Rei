import ReiClient from "../types/ReiClient";

export const general = (client: ReiClient) => `Hey there, I'm ${client.user?.username}!
I'm here to enhance your server!

Invite me to your discord server: <https://discordapp.com/oauth2/authorize?client_id=278819964851322880&scope=bot&permissions=2146958591>
    
Got any ideas or suggestions? Use \`${
  client.prefixHandler.defaultPrefix
}feedback (suggestion)\` to let the developers know!
Need help or have an issue? Let us know over at <https://github.com/TSkoll/Rei>

Commands (**Default prefix: "${client.prefixHandler.defaultPrefix}"**):
${client.commandHandler.getCommandNames().join("\n")}

For more information, please use \`${client.prefixHandler.defaultPrefix}help (command)\``;
