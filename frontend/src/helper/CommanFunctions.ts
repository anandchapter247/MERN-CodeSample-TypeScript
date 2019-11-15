//Meraging Two Array to generate unique values
export function arrayMerging(oldArray: any [], newArray: any) {
  var uniqueArray =
    oldArray.concat(
      newArray.filter(
        (item: any) => oldArray.findIndex((value: any) => value === item) < 0
      )
    )
  return uniqueArray
}