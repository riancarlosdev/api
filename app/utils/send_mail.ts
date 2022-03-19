import nodemailer from 'nodemailer';

export async function sendMail(to:string, code: string, subject: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'fc870b1f7d798e',
      pass: '8e5b7cda202a7e',
    },
  });

  await transporter.sendMail({
    from: '"👻" <c17f18ae69-546737+1@inbox.mailtrap.io>',
    to,
    subject,
    text: code,
    html: code,
  });
}
