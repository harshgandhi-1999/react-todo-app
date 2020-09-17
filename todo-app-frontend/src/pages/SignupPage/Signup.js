import React, { useState } from "react";

import WelcomeNavbar from "../../components/WelcomeNavbar";
import SignupFormComponent from "./components/SignupFormComponent";
import SignUpToast from "./components/SignUpToast";

const Signup = (props) => {
  const [show, setShow] = useState(false);
  const [toastHeader, settoastHeader] = useState("");
  const [toastBody, settoastBody] = useState("");
  return (
    <>
      <WelcomeNavbar />
      <SignUpToast
        show={show}
        setShow={setShow}
        toastHeader={toastHeader}
        toastBody={toastBody}
      />
      <SignupFormComponent
        history={props.history}
        setShow={setShow}
        settoastBody={settoastBody}
        settoastHeader={settoastHeader}
      />
    </>
  );
};

export default Signup;
