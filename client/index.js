import Events from 'events';
import { TerminalController } from './src/terminalController.js';
import { CliConfig } from './src/cliConfig.js';
import { SocketClient } from './src/socket.js';
import { EventManager } from './src/eventManager.js';

const [nodePath, filePath, ...commands] = process.argv;
const cliConfig = CliConfig.parseArguments(commands);

const componentEmitter = new Events();

const socketClient = new SocketClient(cliConfig);
await socketClient.initialize();

const eventManager = new EventManager({ componentEmitter, socketClient });

const data = {
  roomId: CliConfig.room,
  userName: CliConfig.userName,
};

eventManager.joinRoomAndWaitForMessages(data);

const terminalController = new TerminalController();
await terminalController.initializeTable(componentEmitter);
