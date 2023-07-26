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

        await client.search({
            index: body["index"],
            _source: false,
            body: {
                aggs: {
                    fields: {
                        terms:
                        {
                          field: body.field,
                        }
                    }
                  }
            }            
        })
        .then((response) => {
            return res.status(200).json({
                hist : response.body
            })
        })
        .catch((res_error) => {
            res.status(400).send(res_error)
        })
    }
}

export default handler;