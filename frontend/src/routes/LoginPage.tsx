import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  f7,
  Block,
  Button,
} from "framework7-react";
import useGetSearchParam from "../hooks/getSearchParam";
import useFormLoadingState from "../hooks/formLoadingState";
import useFormActionData from "../hooks/formActionData";
import { useEffect } from "react";

export default () => {
  let from = useGetSearchParam("from") || "/";
  let isLoggingIn = useFormLoadingState("username", "password");
  let actionData = useFormActionData<User>();

  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggingIn) {
      f7.dialog.close();
      f7.dialog.preloader("Signing in");
    }
    if (actionData) {
      f7.dialog.close();
      if (actionData.message) f7.dialog.alert(actionData.message);
      if (actionData.redirect) navigate(actionData.redirect, {replace: true});
    }
  }, [isLoggingIn, actionData]);

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <img src="/logo.jpg" style={{ margin: "auto" }} />
      <LoginScreenTitle>My App</LoginScreenTitle>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <List>
          <ListInput
            label="Username"
            type="text"
            name="username"
            placeholder="Your username"
          />
          <ListInput
            label="Password"
            type="password"
            name="password"
            placeholder="Your password"
          />
        </List>
        <Block>
          <Button type="submit" large fillMd>
            Login
          </Button>
        </Block>
      </Form>
    </Page>
  );
};
