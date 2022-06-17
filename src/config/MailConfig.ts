class MailConfig {
  public host = process.env.EMAIL_HOST;

  public port = +process.env.EMAIL_PORT;

  public user = process.env.EMAIL_USER;

  public password = process.env.EMAIL_PASS;
}

export default new MailConfig();
