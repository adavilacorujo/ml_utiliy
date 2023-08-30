
import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        let body;
        try {
            body = JSON.parse(req.body);
        } catch {
            body = req.body;
        }

        await fetch(`http://${process.env.ML_HOST}:${process.env.ML_PORT}/results`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                modelName       : body.modelName,
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return res.status(200).json({
                results : data["results"]
            });
        })
        .catch((error) => {
            console.log('Error', error);
            res.status(400).send(error);
        })
    }
}


export default handler;