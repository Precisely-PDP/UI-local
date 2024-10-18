import { NpmCommands } from "../enums/NpmCommands.enum";
import { ITerminalInit } from "../Interfaces/ITerminalInit";
import { getRepoPath } from "./getRepoPath";
import {ChannelsName} from '../enums/channelsName.enum';

export const getTerminals = (): ITerminalInit[] => {
    return [
        {
            id: '0',
            cwd: getRepoPath('core', 'communicate-ui-orchestrator'),
            name: ChannelsName.ORCHESTRATOR,
            commands: [NpmCommands.START]
          },
          {
            id: '1',
            cwd: getRepoPath('core', 'communicate-ui-header'),
            name: ChannelsName.HEADER,
            commands: [NpmCommands.SERVE]
          },
          {
            id: '2',
            cwd: getRepoPath('core', 'communicate-ui-core'),
            name: ChannelsName.CORE,
            commands: [NpmCommands.SERVE]
          },
          {
            id: '3',
            cwd: getRepoPath('video', 'video-channel-ui'),
            name: ChannelsName.VIDEO,
            commands: [NpmCommands.SERVE]
          },
          {
            id: '4',
            cwd: getRepoPath('chat', 'converse-ui'),
            name: ChannelsName.CHAT,
            commands: [NpmCommands.SERVE]
          },
          {
            id: '5',
            cwd: getRepoPath('block-designer', 'communicate-block-designer'),
            name: ChannelsName.BLOCK_DESIGNER,
            commands: [NpmCommands.SERVE]
          },
          {
            id: '6',
            cwd: getRepoPath('document-designer', 'communicate-document-designer'),
            name: ChannelsName.DOCUMENT,
            commands: [NpmCommands.SERVE]
          }
    ];
};
