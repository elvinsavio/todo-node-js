import * as jose from "jose";

const secret = new TextEncoder().encode("cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2");

const alg = "HS256";
export default {
  async sign(token: jose.JWTPayload) {
    return new jose.SignJWT(token).setProtectedHeader({ alg }).setIssuedAt().setExpirationTime("2h").sign(secret);
  },

  verify(token: string) {
    return jose.jwtVerify(token, secret);
  },
};
