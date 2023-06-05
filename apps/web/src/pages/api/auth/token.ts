import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { access_token } = await fetch(
      `https://dev-nydlolpi6mfz5eo3.eu.auth0.com/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "ozKpdSeEg9sftMt1YnTn8uAWthClrPOW",
          client_secret:
            "3P7Vv45SVuWDT7fE0yZMa5RLC5UIf6G1jWYcirIL-I0Kuedi4_GLEwkLSKrXWVM-",
          audience: "https://dev-nydlolpi6mfz5eo3.eu.auth0.com/api/v2/",
          grant_type: "client_credentials",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        res.status(500).json(error);
      });

    res.status(200).json(access_token);
    console.log(access_token);
  }
  res.status(405).end();
}
