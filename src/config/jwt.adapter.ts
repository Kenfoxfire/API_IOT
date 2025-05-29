import jwt, { Secret, SignOptions } from 'jsonwebtoken';



export class JwtAdapter {

  static async generateToken(payload: any, duration: any = (process.env.JWT_DURATION || '2h')) {

    return new Promise((resolve) => {
      const JWT_SEED = process.env.JWT_SEED;
      if (!JWT_SEED) {
        console.error('JWT_SEED is not defined in environment variables');
        process.exit(1);
      }
      const secret: Secret = JWT_SEED;

      const options: SignOptions = {
        expiresIn: duration,
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return resolve(null);
        resolve(token)
      });
    })



  }


  static validateToken<T>(token: string): Promise<T|null> {

    return new Promise((resolve, _) => {
      const JWT_SEED = process.env.JWT_SEED;
      if (!JWT_SEED) {
        console.error('JWT_SEED is not defined in environment variables');
        process.exit(1);
      }
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) {
          console.error('Error validating token:', err);
          return resolve(null);
        }
        resolve(decoded as T);
      });

    })
  }


}

