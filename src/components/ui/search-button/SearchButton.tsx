import Button from "react-bootstrap/Button";

export interface SearchButtonProps {
  buttonTitle: string;
  disabled: boolean;
}

const SearchButton = (props: SearchButtonProps) => (
  <Button type="submit" variant="outline-primary" disabled={props.disabled}>
    {props.buttonTitle}
  </Button>
);

export default SearchButton;
