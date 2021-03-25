import Events from 'events';
import { TerminalController } from './src/terminalController.js';
import { CliConfig } from './src/cliConfig.js';
import { SocketClient } from './src/socket.js';

const [nodePath, filePath, ...commands] = process.argv;
const cliConfig = CliConfig.parseArguments(commands);

const componentEmitter = new Events();
const socketCliente = new SocketClient(cliConfig);
const terminalController = new TerminalController();

await socketCliente.initialize();
await terminalController.initializeTable(componentEmitter);
