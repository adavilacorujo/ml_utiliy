import { NextApiRequest, NextApiResponse } from 'next'

async function performQuery({esHost, esUsername, esPassword, esSecurity}) {
    const { Client } = require('@elastic/elasticsearch');
    let returnValue = false;
    let client;
    if (esSecurity === 1) {
        client = new Client({
            node: `http://${esHost}:9200`,
            auth: {
                username: esUsername,
                password: esPassword
            }
        });

    }
    else {
        client = new Client({
            node: `http://${esHost}:9200`,
        });
    }
    
    await client.cat.indices({
        index: "_all",
        format: "json",
    })
    .then(() => {
        returnValue = true;
    })
    .catch(() => {
        returnValue = false;
    })

    return returnValue;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let esHost;
    let esUsername;
    let esPassword;
    let esSecurity;

    if (req.method === 'GET') {
        esHost     = process.env.ES_HOST;
        esUsername = process.env.ES_USERNAME;
        esPassword = process.env.ES_PASSWORD;
        esSecurity = Number(process.env.SECURITY_FLAG);
    }
    else if (req.method === 'POST') {
        let body;

        try {
            body = req.body;
        }
        catch {
            body = JSON.parse(req.body);
        }
        esUsername = body.esUsername;
        esPassword = body.esPassword;
        esHost     = body.esHost;
        esSecurity = Number(body.esSecurity);

    }
    else {
        return res.status(401).send('Method not allowed');
    }

    // Check connection
    performQuery({esHost, esUsername, esPassword, esSecurity})
    .then((result) => {
        return res.status(200).send(result);
    })
    .catch((error) => {
        return res.status(500).send(error);
    })

}

export default handler;