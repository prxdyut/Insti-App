export default (start: number, end: number) =>
  start < end ? `${((end - start) / 1000).toFixed(2)}s` : "0s";
