import slugify from 'slugify';
import { UserModel } from '../models';

const checkUniqueData = async (slug: string, modelName: string) => {
  let result: Document | null | any;
  result = await UserModel.findOne({ lessonSlug: slug });
  if (!result) {
    return true;
  } else {
    return false;
  }
};

export const generateSlug = async (name: string, model: string) => {
  let url: string = slugify(name.toLowerCase(), { remove: /[*+~.()'"!:@]/g });
  let isUnique: boolean;
  isUnique = false;
  let i: number = 1;
  let tempUrl: string = url;
  while (!isUnique) {
    const result = await checkUniqueData(tempUrl, model);
    isUnique = result;
    if (!isUnique) {
      tempUrl = `${url}-${i}`;
      i++;
    }
  }
  return tempUrl;
};
