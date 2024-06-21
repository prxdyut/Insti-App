export const getButton = (formData: FormData) => {
  const label = formData.getAll("button_label") as string[];
  const link = formData.getAll("button_link") as string[];

  return { label, link };
};
