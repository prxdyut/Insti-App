type Input = {
  type: "text" | "textarea" | "date" | "time" | "number";
  label: string;
  placeholder?: string;
  required: boolean;
  name: string;
  defaultValue?: string;
};
type Hidden = {
  type: "hidden";
  name: string;
  value: string;
};
type Subject = {
  type: "subject";
  required: boolean;
  label?: string;
  placeholder?: string;
  value?: number;
};
type Editor = {
  type: "editor";
  name: string;
  required: boolean;
  placeholder: string;
  value?: string;
};
type Block = {
  type: "block";
  label: string;
};
type Hr = {
  type: "hr";
};
type Button = {
  type: "button";
  labelLabel: string;
  labelValue?: string;
  linkLabel: string;
  linkValue?: string;
};
type Files = {
  type: "files";
  label: string;
  name?: string;
  value?: FileRef[];
  single?: boolean;
};
type Option_ = {
  type: "option";
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  name: string;
  value?: string;
};

type FormBuilder =
  | Input
  | Subject
  | Button
  | Files
  | Option_
  | Editor
  | Hidden
  | Block
  | Hr;
type FormActionData = {
  error?: string;
  success?: string;
  redirect?: string;
  toast?: string;
};
