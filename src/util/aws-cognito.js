import { Auth, Amplify, Hub } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

let hubListenerCancelToken = null;

export async function deleteUser() {
  try {
    await Auth.deleteUser();
  } catch (error) {
    console.log(error);
  }
}

export async function doesUserExist(email) {
  try {
    await Auth.confirmSignUp(email, "000000", { forceAliasCreation: false });
    // if we get here, the user exists and we somehow confirmed them with the code 000000
    // this should never happen, but if it does we return true
    return true;
  } catch (error) {
    if (
      error.code === "CodeMismatchException" ||
      error.code === "ExpiredCodeException" ||
      error.code === "AliasExistsException" ||
      error.code === "NotAuthorizedException"
    ) {
      // we expect a CodeMismatchException when the email is known to us
      return true;
    }
    if (error.code === "UserNotFoundException") {
      // we expect a UserNotFoundException when the email is not know to us
      return false;
    }

    // any other error means something went wrong so we rethrow the
    // error to avoid infering the user does or doesn't exist
    throw error;
  }
}

export async function createUser(
  user,
  pass,
  phone,
  firstName,
  lastName,
  title,
) {
  try {
    const signUpResponse = await Auth.signUp({
      username: user,
      password: pass,
      attributes: {
        given_name: firstName,
        family_name: lastName,
        phone_number: phone,
        "custom:title": title,
      },
      autoSignIn: {
        // enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(signUpResponse);
    return signUpResponse;
  } catch (error) {
    // TODO how should we respond to errors here? Simply return null?
    console.error(error);
    // if (error.code === "UsernameExistsException") {
    //   setEmailError("Account with email already exists!");
    // }
    return null;
  }
}

export async function listenToAutoSignInEvent(setSignedInUser) {
  if (hubListenerCancelToken) hubListenerCancelToken();
  hubListenerCancelToken = Hub.listen("auth", ({ payload }) => {
    const { event } = payload;
    if (event === "autoSignIn") {
      const user = payload.data;
      setSignedInUser(user);
    } else if (event === "autoSignIn_failure") {
      setSignedInUser(null);
    }
  });
}

export async function cancelListenToAutoSignInEvent() {
  hubListenerCancelToken();
}

export async function confirmSignUp(email, confirmationCode) {
  try {
    return await Auth.confirmSignUp(email, confirmationCode);
  } catch (error) {
    console.error(error);
  }
}

export async function resendSignUp(email) {
  try {
    return await Auth.resendSignUp(email);
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(email, password) {
  const user = await Auth.signIn({
    username: email,
    password: password,
  });
  return user;
}

export async function getUserInfo() {
  try {
    return await Auth.currentUserInfo();
  } catch (error) {
    return null;
  }
}

export async function updateUserAttributes(attrs) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return await Auth.updateUserAttributes(user, attrs);
  } catch (error) {
    console.log("Error updating user attributes: ", error);
    return null;
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error("error signing out: ", error);
  }
}

export async function forgotPassword(email) {
  try {
    return await Auth.forgotPassword(email);
  } catch (error) {
    console.error(error);
  }
}

export async function resetPassword(email, confirmationCode, password) {
  try {
    return await Auth.forgotPasswordSubmit(email, confirmationCode, password);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
