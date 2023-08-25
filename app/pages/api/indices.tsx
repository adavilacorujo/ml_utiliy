import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {

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

        await client.cat.indices({format: 'json'})
            .then((response) => {
                return res.status(200).json({
                    indices : response.body
                });
            })
            .catch((res_error) => {
                return res.status(400).send(res_error)
            })
    }
}

export default handler;