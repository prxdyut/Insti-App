type Assignment = {
  uid: string;
  _id: string;
  title: string;
  subject: number;
  description: string;
  files: _File[];
  by: UserRef;
  date: {
    start: Date;
    end: Date;
  };
};

type Status = "accepted" | "rejected";

type Submission = {
  _id: string;
  by: UserRef;
  assignmentId: string;
  date: {
    created: Date;
  };
  description: string;
  files: _File[];
  remark?: string;
  status?: Status;
};
