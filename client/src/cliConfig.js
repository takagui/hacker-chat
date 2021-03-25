export class CliConfig {
  constructor({ userName, room, hostUri }) {
    this.userName = userName;
    this.room = room;

    const { protocol, hostname, port } = new URL(hostUri);

    this.protocol = protocol.replace(/\W/, '');
    this.host = hostname;
    this.port = port;
  }

  static parseArguments(commands) {
    const cmd = new Map();

    for (const key in commands) {
      const index = parseInt(key);
      const command = commands[key];

      const commandPrefix = '--';

      if(!command.includes(commandPrefix)) continue;

      cmd.set(
        command.replace(commandPrefix, ''),
        commands[index + 1],
      );
    }

    return new CliConfig(Object.fromEntries(cmd));
  }
}