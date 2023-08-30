import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await fetch(`http://${process.env.ML_HOST}:${process.env.ML_PORT}/models`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
            return res.status(200).json({
                models : data["models"]
            });
        })
        .catch((error) => {
            console.log('Error', error);
            res.status(400).send(error);
        })
    }
}


export default handler;