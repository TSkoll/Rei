import Command from "../../types/command/Command";

export interface SubCommandFactory {
  new (): Command;
}

export function constructSubCommand(parent: Command, subcommands: SubCommandFactory[]) {
  return subcommands.map(subcmd => {
    let cmd = new subcmd();
    cmd.parent = parent;

    return cmd;
  });
}
