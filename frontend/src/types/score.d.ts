type Score = {
  uid: string;
  testId: string;
  title: string;
  subject: number;
  marks: {
    obtained: number;
    total: number;
  };
  answers: _File[];
  questions: _File[];
  date: Date;
};

type AllScore = {
  uid: string;
  testId: string;
  title: string;
  subject: number;
  total: number;
  obtained:number[];
  users: string;
  answers: _File[];
  questions: _File[];
  date: Date;
};
