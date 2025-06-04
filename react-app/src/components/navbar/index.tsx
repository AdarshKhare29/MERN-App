// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Logo } from "./logo";
import { ArrowRight, Menu } from "lucide-react"
import { Button, buttonVariants } from "../ui/button";

const NavbarContainer = styled.nav`
  background-color: #333;
  // padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #f39c12;
  }
`;

// const Navbar = () => {
//   const { user } = useSelector((state: any) => state.authReducer);

//   return (
//     <NavbarContainer>
//       <NavList>
//         <NavItem to="/">Home</NavItem>
//         <NavItem to="/about">About</NavItem>
//         {!user ? (
//           <>
//             <NavItem to="/login">Login</NavItem>
//             <NavItem to="/register">Register</NavItem>
//           </>
//         ) : (
//           <NavItem to="/logout">Logout</NavItem>
//         )}
//       </NavList>
//     </NavbarContainer>
//   );
// };

// export default Navbar;






const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
]

const Navbar = () => {
  const { user } = useSelector((state: any) => state.authReducer);
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link key={item.href} to={item.href} className="text-gray-600 hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to={"/register"} className={buttonVariants({ variant: "default", size: "default" })}>
                  Sign In
                </Link>
                <Link to={"/login"} className={buttonVariants({ variant: "default", size: "default" })}>
                  Log In
                </Link>
              </>)
              : (
                <Link to={"/logout"} className={buttonVariants({ variant: "default", size: "default" })}>Logout</Link>
              )}
            <Button className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>

          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar