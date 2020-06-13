import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import SubCommandManager from "../../types/Command/SubCommand/SubCommandManager";
import { constructSubCmd } from "../../types/Command/SubCommand/SubCommand";

import Set from "./weather/set";
import UserModel from "../../models/User";

import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";

export default class Weather extends Command {
  private scm = new SubCommandManager(this, constructSubCmd([Set]));

  constructor() {
    super({
      help: {
        description:
          "Gets the current weather from a specified area. Leaving arguments empty will get the weather from user's default location.",
        args: {
          city: {
            description: "City from where the weather information will be gathered from.",
          },
        },
      },
    });

    this.scm.default = this.default.bind(this);
    this.scm.noArgs = this.noArgs.bind(this);
  }

  public async run(message: CommandMessage, args: string[]) {
    await this.scm.runSubCommand(message, args);
  }

  private async noArgs(message: CommandMessage) {
    const user = await UserModel.findOne({ id: message.author.id });
    if (!user || !user.defaultWeather)
      throw `No default location set!\nYou can set one using ${message.prefix}weather set (city)`;
    const area = user.defaultWeather;

    await this.getWeather(message, area);
  }

  private async default(message: CommandMessage, args: string[]) {
    let area = args.join(",");
    await this.getWeather(message, area);
  }

  private async getWeather(message: CommandMessage, area: string) {
    if (!message.reiClient.config.integrations.openweathermapKey)
      throw "This bot has not been configured properly, weather command is unable to work.";

    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${area}&units=metric&appid=${message.reiClient.config.integrations.openweathermapKey}`
    ).then(resp => resp.json());

    if (resp.cod == "404") throw "I could not find this place!";

    const weather = resp.weather[0];

    await message.replyEmbed(
      new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`${resp.name}, ${resp.sys.country}`)
        .setThumbnail(`http://openweathermap.org/img/w/${weather.icon}.png`)
        .setDescription(`Weather: ${weather.description}`)
        .addField(
          "Tempretature",
          `**Real**: ${resp.main.temp.toFixed(1)}°C\n**Feels like**: ${resp.main.feels_like.toFixed(1)}°C`,
          true
        )
        .addField("Other", `**Wind**: ${resp.wind.speed} m/s\n**Humidity**: ${resp.main.humidity}%`, true)
        .setFooter(
          "Powered by OpenWeatherMap",
          "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_32x32.png"
        )
    );
  }
}
