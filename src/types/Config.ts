export default interface Config {
  token: string;
  defaultPrefix: string;
  ownerId: string;
  database: {
    host: string;
    collection: string;
    username?: string | null;
    password?: string | null;
  };
  integrations: {
    saucenaoKey?: string;
  };
}
