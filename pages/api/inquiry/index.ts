import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { Inquiry } from '../../../core/models';

import { IInquiry } from '../../../core/types';

interface IParams {
    limit?: number;
    page?: number;
    offset?: number;
    sort?: string[] | string;
    order?: string[][];
    query?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            const { limit = 10, page = 1, sort = null, query }: IParams = req.query;
            const params: IParams = {
                limit: +limit
            };
            if (page && limit) {
                params.offset = (+page - 1) * +limit;
            }
            if (sort) {
                params.order = [sort && typeof sort === 'string' && sort.split(' ')];
            }

            try {
                const result = await Inquiry.findAndCountAll(params as any);
                res.status(200).send(result);
            } catch (error) {
                console.log(error)
                res.status(500).send({ error: true, message: error });
            }
            break;
        case 'POST':
            const email = 'jn16h7@gmail.com';

            let transporter = nodemailer.createTransport({
                host: "smtp.hostinger.ph",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'marketing-testdev@saversairsolutions.com', // generated ethereal user
                    pass: '!Access123', // generated ethereal password
                },
            });

            let info = await transporter.sendMail({
                from: '"Savers Air Solution 👻" <marketing-testdev@saversairsolutions.com>', // sender address
                to: email, // list of receivers
                subject: "Inquiry", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });
            res.status(200).send(info)
        // console.log(info)
        // const { email }: IInquiry = req.body;
        // try {
        //     const result = await Inquiry.create(req.body);


        //     res.status(200).send(result);
        // } catch (error) {
        //     console.log(error)
        //     res.status(500).send({ error: true, message: error });
        // }
        // break;
    }
};