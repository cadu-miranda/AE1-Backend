class AuthConfig {
  public secret = process.env.SECRET_KEY;

  public expiresIn = "7d";
}

export default new AuthConfig();
