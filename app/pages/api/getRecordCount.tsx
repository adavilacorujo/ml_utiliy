import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        let body;
        try {
            body = JSON.parse(req.body);
        } catch {
            body = req.body;
        }


        const { Client } = require('@elastic/elasticsearch');

        // Read data from env
        let client;
        if (Number(process.env.SECURITY_FLAG) === 1) {
            client = new Client({
                node: `http://${process.env.ES_HOST}:9200`,
            })
        }
        else {
            client = new Client({
                node: `http://${process.env.ES_HOST}:9200`,
                auth: {
                    username: process.env.ES_USERNAME,
                    password: process.env.ES_PASSWORD
                }
            })
        }

        await client.cat.count({
            index: body["index"]
        })
        .then((response) => {
            return res.status(200).json({
                count : response
            })
        })
        .catch((res_error) => {
            res.status(400).send(res_error)
        })
    }
}

export default handler;