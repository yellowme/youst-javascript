import React from "react";
import gql from "graphql-tag";
import { useFormik } from "formik";
import { useMutation } from "react-apollo";

import { ALL_LINKS_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

export default function CreateLink() {
  const [mutate] = useMutation(CREATE_LINK_MUTATION);

  const formik = useFormik({
    initialValues: {
      description: "",
      url: ""
    },
    onSubmit: submitFormMutation
  });

  function submitFormMutation(variables) {
    return mutate({
      variables,
      update: (store, { data: { post } }) => {
        const first = LINKS_PER_PAGE;
        const skip = 0;
        const orderBy = "createdAt_DESC";

        const data = store.readQuery({
          query: ALL_LINKS_QUERY,
          variables: { first, skip, orderBy }
        });

        data.allLinks.unshift(post);

        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data,
          variables: { first, skip, orderBy }
        });
      }
    });
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-column mt3">
        <input
          name="description"
          className="mb2"
          onChange={formik.handleChange}
          value={formik.values.description}
          type="text"
          placeholder="A description for the link"
        />
        <input
          name="url"
          className="mb2"
          onChange={formik.handleChange}
          value={formik.values.url}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={formik.handleSubmit}>Submit</button>
    </form>
  );
}

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;
