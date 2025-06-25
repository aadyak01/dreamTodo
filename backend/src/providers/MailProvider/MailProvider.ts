export type MailType = {
  to: string
  subject: string
  content: string
}

export interface MailProvider {
    // This interface defines the structure for a mail provider
  sendMail: (data: MailType) => Promise<void>
}
