import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div style={style}>
    <SignUp path="/sign-in" routing="path" signInUrl="/sign-up" />
  </div>
);

export default SignUpPage;

const style = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
