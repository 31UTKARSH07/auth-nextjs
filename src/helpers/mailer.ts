import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "95a406779ead36",
                pass: "9d9c71c2c40cb4"
                //TODO: add these credentials to .env file
            }
        });

        const mailOptions = {
            from: 'utkarsh@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/
            verifyemail?token=${hashedToken}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : "Reset your password"}
            or copy and paste the link below in your 
            browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

        }

        // Send the email
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error.message);
    }
}