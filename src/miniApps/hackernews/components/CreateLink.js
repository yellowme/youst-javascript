import React from "react";
import { useFormik } from "formik";

import useCreateLinkMutation from "../hooks/useCreateLinkMutation";

export default function CreateLink({ history }) {
  const [createLink] = useCreateLinkMutation();
  const formik = useFormik({
    initialValues: {
      description: "",
      url: ""
    },
    onSubmit: handleSubmitForm
  });

  async function handleSubmitForm(data) {
    await createLink(data);
    history.push("/");
    return;
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
