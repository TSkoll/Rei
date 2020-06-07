export default interface HelpText {
  name: string;
  description: string;
  aliases?: string[];
  args?: { [key: string]: HelpText };
}
