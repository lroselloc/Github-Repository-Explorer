import { Container, Navbar } from "react-bootstrap";
import LoadingOverlay from "../ui/loading-overlay/LoadingOverlay";
import Notifier from "../ui/notifier/Notifier";

type LayoutProps = {
  children?: JSX.Element[] | JSX.Element | undefined;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <LoadingOverlay />
      <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand>GitHub Repository Explorer</Navbar.Brand>
        </Container>
      </Navbar>
      <Notifier />
      <br></br>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
