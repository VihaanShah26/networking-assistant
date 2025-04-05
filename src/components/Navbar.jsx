import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { signInWithGoogle, signOut, useAuthState } from "./firebase";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const SignInButton = () => (
    <Button variant="danger" onClick={signInWithGoogle}>Sign In</Button>
  );
  
  const SignOutButton = () => (
    <Button variant="success" onClick={signOut}>Sign Out</Button>
  );
  
  const AuthButton = () => {
    const [user] = useAuthState();
    return user ? <SignOutButton /> : <SignInButton />;
  };
  
  const activation = ({isActive}) => isActive ? 'active' : 'inactive';

return (
    <Navbar bg="" variant="dark" expand="lg" className="fixed-top" style={{ marginTop: "1vh", zIndex: 10 }}>
        <Container>
            <Navbar.Brand as={Link} to="/">
                NetworkMate
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/network"> Network </Nav.Link>
                    <Nav.Link as={Link} to="/profile"> Profile </Nav.Link>
                </Nav>
                <AuthButton />
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
};

export default NavigationBar;