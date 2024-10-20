import nodemailer from 'nodemailer'

const useTestAccount = false; // TRUE-> DEVELOPEMENT FALSE-> PRODUCTION

export const createTransporter = async () => {
  if (useTestAccount) {
    let testAccount =  await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: testAccount.user, // email de teste
        pass: testAccount.pass, // senha de teste
      },
    });
  } else {
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });
  }


}

export const sendEmail = async (to, subject, text) => {
  console.log("Chegou no inicio da funcao sendEmail");
  const transporter = await createTransporter()
  const mailOptions = {
    from: 'no-reply@test.com',
    to,
    subject,
    text,
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.messageId); // Mostra o ID do email enviado
    console.log('URL para visualização do email: %s', nodemailer.getTestMessageUrl(info)); // Link para visualizar o email
    return info;
  } catch (error) {
    console.error('Erro ao enviar email: ', error)
    throw error;
  }
}
