import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let body;
        try {
            body = JSON.parse(req.body);
        } catch {
            body = req.body;
        }

        // Send request to ML api
        await fetch(`http://${process.env.ML_HOST}:${process.env.ML_PORT}/inject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id              : body.id,
                modelName       : body.modelName,
                index           : body.index,
                attributeList   : body.attributeList,
                startDate       : body.startDate,
                endDate         : body.endDate,
                dataType        : body.dataType,
                dataFilter      : body.dataFilter,
                modifyFilter    : body.modifyFilter
            })
        })
        .then((response) => {
            if (response.status === 200) {
                // Good response
                return res.status(response.status).send(true);
            }
            else {
                return res.status(response.status).send(false);
            }
        })
        .catch((error) => {
            console.log("Error", error);
            return res.status(500).send(error);
        })
    }
}

export default handler;