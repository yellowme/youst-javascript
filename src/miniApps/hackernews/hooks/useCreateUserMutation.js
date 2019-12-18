import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function useCreateUserMutation() {
  const [mutate] = useMutation(CREATE_USER_MUTATION);

  function createUser({ name, email, password }) {
    return mutate({
      variables: {
        name,
        authProvider: {
          email: {
            email,
            password
          }
        }
      }
    });
  }

  return createUser;
}

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $authProvider: AuthProviderSignupData!
  ) {
    createUser(name: $name, authProvider: $authProvider) {
      id
    }
  }
`;
