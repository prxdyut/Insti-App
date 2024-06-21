import { f7 } from "framework7-react";
import { useEffect } from "react";
import { useActionData, useNavigate, useNavigation } from "react-router-dom";

type cb = {
  success?(): void;
  error?(): void;
};
type options = {
  loadingModal: boolean;
};

export default function useFormHandler(cb?: cb, options?: options) {
  const navigation = useNavigation();
  const loading = navigation.formData != undefined;
  const actionData = useActionData() as FormActionData | undefined;
  const navigateTo = useNavigate();

  useEffect(() => {
    if (actionData) {
      if ((actionData?.error as string) || (actionData?.success as string))
        f7.dialog.alert(
          (actionData?.error as string) || (actionData?.success as string)
        );
      if (actionData?.error && cb?.error) cb?.error();
      if (actionData?.success && cb?.success) cb?.success();
      if (actionData.toast)
        f7.toast
          .create({
            text: actionData.toast,
            closeTimeout: 3000,
          })
          .open();
      if (actionData?.redirect) navigateTo(actionData.redirect as string);
    }
  }, [actionData]);

  useEffect(() => {
    if (options) {
      if (options.loadingModal) {
        if (loading) f7.dialog.progress();
        else f7.dialog.close();
      }
    } else {
      if (loading) f7.dialog.progress();
      else f7.dialog.close();
    }
  }, [loading]);

  return {
    loading,
    success: actionData?.success as string,
    error: actionData?.error as string,
  };
}
