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
           const email = 'airsolutionssavers@gmail.com';
            let transporter = nodemailer.createTransport({
                host: "smtp.hostinger.ph",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'marketing@volksliftphil.com', 
                    pass: '!Access123',
                },
            });

            let message = req.body.message;
            let fullname= req.body.firstName + " " + req.body.lastName;
            let emailAdd = req.body.email;
            let cpNum = req.body.phone;
            
            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // var yyyy = today.getFullYear();

            // today = mm + '/' + dd + '/' + yyyy;
            let info = await transporter.sendMail({
                from: '"Volkslift Philippines" <marketing@volksliftphil.com>', // sender address
                to: email,
                subject: "Inquiry",
                text: req.body.message,
                html: `Name: ${fullname},<br />
                        Email: ${emailAdd},<br />
                        Phone: ${cpNum},<br />
                        Subject: Inquiry,<br />
                        Message:<br />${message}`,
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