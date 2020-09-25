import nfetch from "node-fetch";
import QuaverUsersFull from "../../../../types/Requests/Quaver/QuaverUsersFull";

export default class fetch {
  private static endpoint: string = "https://api.quavergame.com/v1";

  static async fullUser(userId: string) {
    const resp = (await nfetch(`${this.endpoint}/users/full/${userId}`).then(resp => resp.json())) as QuaverUsersFull;
    if (!resp) throw "No profile with this user id could be found.";
    return resp;
  }
}
