import {NpmCommands} from '../enums/npmCommands.enum';
import {ITerminalInit} from '../Interfaces/ITerminalInit';
import {getRepoPath} from './getRepoPath';
import {ChannelsName} from '../enums/channelsName.enum';

export const getTerminals = (linkRenderer = false, linkLibrary = false, linkCommon = false): ITerminalInit[] => {
  const stage = localStorage.getItem('stage');
  const serveCommands = [];
  const rendererCommands = [];
  const sharedCommands = [];
  const commonCommands = [];
  const packages = [];

  if (linkRenderer) {
    packages.push('@preciselydata/communicate-block-renderer');
    sharedCommands.push('npm link @preciselydata/communicate-block-renderer');
    commonCommands.push('@preciselydata/communicate-block-renderer');
  }

  if (linkLibrary) {
    packages.push('@preciselydata/communicate-shared-library');
    commonCommands.push('@preciselydata/communicate-block-renderer');
  }

  if (linkCommon) {
    packages.push('@preciselydata/communicate-block-designer-common');
  }

  if (packages.length > 0) {
    serveCommands.push(`npm link ${packages.join(' ')}`);
  }

  if (commonCommands.length > 0) {
    commonCommands.push(`npm link ${commonCommands.join(' ')}`);
  }

  serveCommands.push(`${NpmCommands.SERVE}-${stage}`);

  let buildCommand = 'npm run build:watchmode:symlink'
  rendererCommands.push(buildCommand)
  sharedCommands.push(buildCommand)
  commonCommands.push(buildCommand)


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
      commands: serveCommands
    },
    {
      id: '2',
      cwd: getRepoPath('core', 'communicate-ui-core'),
      name: ChannelsName.CORE,
      commands: serveCommands
    },
    {
      id: '3',
      cwd: getRepoPath('video', 'video-channel-ui'),
      name: ChannelsName.VIDEO,
      commands: serveCommands
    },
    {
      id: '4',
      cwd: getRepoPath('chat', 'converse-ui'),
      name: ChannelsName.CHAT,
      commands: [`${NpmCommands.SERVE}-${stage}`]
    },
    {
      id: '5',
      cwd: getRepoPath('block-designer', 'communicate-block-designer'),
      name: ChannelsName.BLOCK_DESIGNER,
      commands: serveCommands
    },
    {
      id: '6',
      cwd: getRepoPath('document-designer', 'communicate-document-designer'),
      name: ChannelsName.DOCUMENT,
      commands: serveCommands
    },
    {
      id: '7',
      cwd: getRepoPath('block-designer', 'communicate-block-renderer'),
      name: ChannelsName.RENDERER,
      commands: rendererCommands
    },
    {
      id: '8',
      cwd: getRepoPath('core', 'communicate-shared-library'),
      name: ChannelsName.SHARED_LIBRARY,
      commands: sharedCommands
    },
    {
      id: '9',
      cwd: getRepoPath('block-designer', 'communicate-block-designer-common'),
      name: ChannelsName.COMMON,
      commands: commonCommands
    }
  ];
};
