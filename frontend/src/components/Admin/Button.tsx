import { Button } from "framework7-react";
import { ButtonProps } from "framework7-react/components/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ConditionalButton(props: {
  navigate: string;
  label: string;
  user: User;
  className: string;
  student?: boolean;
  buttonProps?: ButtonProps;
}) {
  const navigateTo = useNavigate();
  const shouldBeHidden = props?.student
    ? (props.user.role == "admin" || props.user.role == "tutor")
    : (props.user.role == "student");

  return (
    <div className={`" ${props.className} ${shouldBeHidden && "hidden"}`}>
      <Button
        {...props.buttonProps}
        fill
        className=""
        onClick={() => navigateTo(props.navigate)}
      >
        {props.label}
      </Button>
    </div>
  );
}
