import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const esHost     = process.env.ES_HOST;
        const esUsername = process.env.ES_USERNAME;
        const esPassword = process.env.ES_PASSWORD;
        const esSecurity = Number(process.env.SECURITY_FLAG);
    
        return res.status(200).json({
            "esHost"    : esHost,
            "esUsername": esUsername,
            "esPassword": esPassword
        })
    }
    else {
        return res.status(401).send('Method not allowed');
    }
}

export default handler;