export const getFiles = (formData: FormData, valName?: string) => {
  const attr = valName ? valName + "_" : "";
  const name = formData.getAll(attr + "files_name") as string[];
  const url = formData.getAll(attr + "files_url") as string[];
  const size = formData.getAll(attr + "files_size") as string[];
  const type = formData.getAll(attr + "files_type") as string[];

  return Array(name.length)
    .fill("")
    .map((_, i) => ({
      name: name[i],
      url: url[i],
      size: size[i],
      type: type[i],
    }));
};
