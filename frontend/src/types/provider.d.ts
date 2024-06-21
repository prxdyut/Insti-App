type Provider<Data> = {
  data: Data;
  initial: boolean;
  load(any): Promise<void>;
};
