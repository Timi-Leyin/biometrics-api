import bcryptjs from "bcryptjs";

export const encrypt = async (str: string) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(str, salt);
};

export const decrypt = (str: string, h: string) => {
  return bcryptjs.compare(str, h);
};
