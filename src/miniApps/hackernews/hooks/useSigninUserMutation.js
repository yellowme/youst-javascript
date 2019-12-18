import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function useSigninUserMutation() {
  const [mutate] = useMutation(SIGNIN_USER_MUTATION);

  function signinUser({ email, password }) {
    return mutate({
      variables: { email: { email, password } }
    });
  }

  return signinUser;
}

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        id
      }
    }
  }
`;
