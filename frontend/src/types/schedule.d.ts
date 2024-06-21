type Schedule = {
  uid: string,
  subject: number;
  date: Date;
  by: UserRef;
  time: {
    from: string;
    to: string;
  };
};
