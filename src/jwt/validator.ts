'use strict';

import { jwtVerify } from 'jose';
const { createSecretKey } = require('crypto');

const _256_BIT_KEY = process.env.ENCRYPTION_KEY || '';

import { getUserInfo } from '../graphql/resolvers/UserAccountResolver';

/**
 *
 *  @param jwt the JSON Web Token to be validate
 *
 *  @returns object
 *
 */

const validator = async (jwt = '') => {
  try {
    const secret = new TextEncoder().encode(createSecretKey(_256_BIT_KEY));
    const { payload } = await jwtVerify(jwt, secret, {
      issuer: process.env.JOSE_ISSUER,
      audience: process.env.JOSE_AUDIENCE,
    });

    const userInfo = await getUserInfo(payload?.id as any);
    return userInfo ? userInfo : 'INVALID_TOKEN';
  } catch {
    return 'INVALID_TOKEN';
  }
};

export default validator;
