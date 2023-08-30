import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let body;

        try {
            body = req.body;
        }
        catch {
            body = JSON.parse(req.body);
        }

        const esHost     = body.esHost;
        const esUsername = body.esUsername;
        const esPassword = body.esPassword;
        let esSecurity = Number(body.securityFlag);
        if (Number.isNaN(esSecurity)) {
            esSecurity = 0;
        }

        // Write to .env file
        let data = 
            '\r ES_HOST=' + esHost + ' \r\n ' + 
            'ES_USERNAME=' + esUsername + ' \r\n ' + 
            'ES_PASSWORD=' + esPassword + ' \r\n ' + 
            'SECURITY_FLAG=' + esSecurity + ' \r\n ' +
            'ML_HOST=' + process.env.ML_HOST + '\r\n' + 
            'ML_PORT=' + process.env.ML_PORT;

        // Requiring fs module in which
        // writeFile function is defined.
        const fs = require('fs')
        
        // Write data in 'Output.txt' .
        fs.writeFile('.env.production', data, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        fs.writeFile('.env.local', data, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })

        return res.status(200).send(true);
    }
    else {
        return res.status(401).send('Method not allowed');
    }
}

export default handler;