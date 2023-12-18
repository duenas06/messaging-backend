'use strict';

const { createSecretKey } = require('crypto');
import { SignJWT } from 'jose';

import IUser from '../constants/interfaces/IUser.interface';

const _256_BIT_KEY = process.env.ENCRYPTION_KEY || '';
const ISSUER = process.env.JOSE_ISSUER || '';
const AUDIENCE = process.env.JOSE_AUDIENCE || '';

const signJWT = async (object: IUser) => {
  try {
    const secret = new TextEncoder().encode(createSecretKey(_256_BIT_KEY));
    const alg = 'HS256';

    const jwt = await new SignJWT({ ...object })
      .setProtectedHeader({ alg })
      .setExpirationTime('360h') // 15 days
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .sign(secret);

    return jwt;
  } catch {
    throw new Error('ERR_JWE_ENCRYPTION_FAILED');
  }
};

export default signJWT;
