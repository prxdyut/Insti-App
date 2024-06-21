type _File = {
    _id: string;
    url: string;
    size: string;
    type: string;
    title: string;
    name: string;
    date: Date;
    icon?: string;
    by: UserRef;
  }