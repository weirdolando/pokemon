export function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Email address is not valid";

    case "auth/weak-password":
      return "Password is too weak";

    case "auth/wrong-password":
      return "Wrong password";

    case "auth/email-already-in-use":
      return "Email has been taken";

    case "auth/user-not-found":
      return "Email doesn't exist";

    case "auth/too-many-requests":
      return "Too many requests, please wait!";

    default:
      return "Something went wrong";
  }
}
