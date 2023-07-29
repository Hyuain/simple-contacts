export const pruneRequestParams = <T extends object>(params: T): Partial<T> => {
  const prunedParams: any = {}
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      prunedParams[key] = value
    }
  }
  return prunedParams
}
