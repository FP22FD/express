import camelcaseKeys, { ObjectLike } from "camelcase-keys";
import { NextFunction, Request, Response } from "express";

// convert backend response to camelCase (res.json)
export const camelcaseResponse = (_req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;

  res.json = function (data: ObjectLike | ObjectLike[]) {
    const camelData = camelcaseKeys(data, { deep: true });
    return oldJson.call(this, camelData);
  };

  next();
};
