import { Form } from "react-bootstrap";
import SearchButton from "../../ui/search-button/SearchButton";
import SearchTextField from "../../ui/search-text-field/SearchTextField";

import { FormikProps } from "formik";

export interface SearchUsernameFormModel {
  username: string;
}

const SearchUsernameForm = (props: FormikProps<SearchUsernameFormModel>) => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <SearchTextField
          name="username"
          onChange={handleChange}
          value={values.username}
          errors={errors.username}
          label="Username"
        />
      </Form.Group>
      <div className="d-grid d-md-block">
        <SearchButton
          buttonTitle="Search"
          disabled={!touched || !isValid || isSubmitting}
        />
      </div>
    </Form>
  );
};

export default SearchUsernameForm;
