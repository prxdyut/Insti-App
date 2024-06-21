type Doubt = {
  uid: string;
  title: string;
  respondants: number;
  subject: number;
  by: UserRef;
  description: string;
  cover: string;
  date: Date;
};

type DoubtReplyReference = {
  id: string | null;
  name: string | null;
};
