Array.prototype.group = function(key: string): any[] {
  return this.reduce((objectsByKeyValue: any, obj: any) => {
    const value: any = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
};
/**
 *
 */
export default {};
