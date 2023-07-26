import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { Client } = require('@elastic/elasticsearch');

        // Read data from file
        const fs = require('fs');
        let credJSON = JSON.parse(fs.readFileSync('./.creds.json', 'utf8'));
        
        const client = new Client({
            node: credJSON.node,
            auth: {
                username: credJSON.username,
                password: credJSON.password
            }
        })

        await client.indices.getMapping({
            index: req.body["index"]
        })
        .then((response) => {
            return res.status(200).json({
                hist : response.body[req.body["index"]].mappings
            })
        })
        .catch((res_error) => {
            res.status(400).send(res_error)
        })
    }
}

export default handler;