import * as bcrypt from 'bcrypt';

export function response(data: any, message: string) {
  return {
    data,
    message,
  };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
