import sendgridTransport from 'nodemailer-sendgrid-transport';

declare module 'nodemailer-sendgrid-transport' {
  interface sendgridTransport {
    name: string;
    version: string;
    send: Function;
  }
}
