import { Container } from "@mui/system";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>hola</nav>
      <main>
        <Container>
            {children}
        </Container>
            </main>
      <footer>footer</footer>
    </div>
  );
};
export default Layout;
