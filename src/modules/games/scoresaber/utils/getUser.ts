import ScModel from "../../../../models/Sc";

export default async function getUser(userid: string, messageContent?: string) {
  let id: string;
  if (messageContent) id = messageContent.replace("https://scoresaber.com/u/", "");
  else {
    const row = await ScModel.findOne({ id: userid });

    if (row) id = row.sc;
    else throw "No profile id/url or the profile hasn't been set!";
  }

  return id;
}
