import { Form } from "react-bootstrap";

export interface SearchTextFieldProps {
  name: string;
  value: string;
  label?: string;
  onChange: (_: any) => any;
  errors?: string;
}

const SearchTextField = ({
  name,
  value,
  label,
  onChange,
  errors,
}: SearchTextFieldProps) => (
  <>
    <Form.Label htmlFor="search-text">{label}</Form.Label>
    <Form.Control
      id="search-text"
      name={name}
      onChange={onChange}
      value={value}
      isInvalid={!!errors}
    />
    <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
  </>
);

export default SearchTextField;
