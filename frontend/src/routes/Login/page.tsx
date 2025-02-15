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
  f7ready,
} from "framework7-react";
import useGetSearchParam from "../../hooks/getSearchParam";
import useFormLoadingState from "../../hooks/formLoadingState";
import useFormActionData from "../../hooks/formActionData";
import { useEffect } from "react";
 
import useFormHandler from "../../hooks/formHandler";

export default () => {
  let from = useGetSearchParam("from") || "/";
  let error = useGetSearchParam("error") || "/";
  const navigateTo = useNavigate();

  useEffect(() => {
    let alertText = "Something Went Wrong";
    if (error == "unauthorised-access")
      alertText = "You Must be Signed in First!";
    if (error == "no-access") alertText = "You can access Private Page!";

    f7.dialog.alert(alertText);
  }, [error]);

  const formHandler = useFormHandler();

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <img src="/logo.jpg" style={{ margin: "auto" }} />
      <LoginScreenTitle>My App</LoginScreenTitle>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <List>
          <ListInput
            label="Email"
            type="text"
            name="email"
            placeholder="Your Email"
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
