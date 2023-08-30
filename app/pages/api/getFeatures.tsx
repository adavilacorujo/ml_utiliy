import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        let body;
        try {
            body = JSON.parse(req.body);
        } catch {
            body = req.body;
        }
        await fetch(`http://${process.env.ML_HOST}:${process.env.ML_PORT}/features`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                modelName       : body.modelName,
            })
        })
        .then(response => response.json())
        .then((data) => {
            return res.status(200).json({
                models : data["features"]
            });
        })
        .catch((error) => {
            console.log('Error', error);
            return res.status(400).send(error);
        })
    }
}


export default handler;