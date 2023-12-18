/**
 *
 *  @param jwt the JSON Web Token to be validate
 *
 *  @returns object
 *
 */
declare const validator: (jwt?: string) => Promise<import("../graphql/models/UserModel").default | "INVALID_TOKEN">;
export default validator;
