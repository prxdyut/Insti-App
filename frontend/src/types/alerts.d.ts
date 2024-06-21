type Alert = {
  uid: string;
  title: string;
  description: string;
  date: Date;
  summary: string;
  button?: {
    link: string;
    label: string;
  };
  files?: _File[]
};
