type ImagesBrowserRefProps = {
  open(): void;
  close(): void;
};

type ImageObject =
  | {
      url: string;
      caption: string;
    }
  | string;
