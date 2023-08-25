import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let body;
        try {
            body = JSON.parse(req.body);
        } catch {
            body = req.body;
        }
        
        let filters = [{ term: { 'log.file.path.keyword' : body.dataType } }];
        
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

        if (body.filters.length > 0) {
            body.filters.forEach((input) => {
                // Active or not handler
                if (input.active) {
                    filters.push(input.filter);
                }
            })
        }
        
        await client.search({
            index: body["index"],
            _source: false,
            body: {
                query: {
                    bool : { 
                        filter: filters
                    }
                },
                aggs: {
                    fields: {
                        terms:
                        {
                          field: body.field,
                        }
                    },
                    // filters: {
                    //     filters: body.filters
                    // }
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