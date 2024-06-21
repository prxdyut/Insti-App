export function wait(ms: number, v: any) {
  // return function (v: any) {
  return new Promise((resolve) => setTimeout(() => resolve(v), ms));
  // };
}
