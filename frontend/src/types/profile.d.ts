type Info =
  | "uid"
  | "firstName"
  | "lastName"
  | "class"
  | "division"
  | "rollNo"
  | "eMail"
  | "phoneNo";

type ProfileInfo = {
  [key in Info]: string;
};

type ProfileFile = {
  title: _File["title"];
  name: _File["name"];
  date: _File["date"];
  size: _File["size"];
  icon: string;
};

type ProfileBadge = {
  id: number;
  date: Date;
  title: string;
  description: string;
};
