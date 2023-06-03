import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";

const SigninView = React.lazy(() => import("pages/SigninView"));
const SignupViewOne = React.lazy(() => import("pages/SignupViewOne"));
const Homepage = React.lazy(() => import("pages/Landingpage"));
const SignupViewTwo = React.lazy(() => import("pages/SignupViewTwo"));
const  ProductOverview = React.lazy(() => import("pages/ProductOverview"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signupviewtwo" element={<SignupViewTwo />} />
          <Route path="/signupviewone" element={<SignupViewOne />} />
          <Route path="/signinview" element={<SigninView />} />
          <Route
            path="/productoverview/"
            element={<ProductOverview />}
          />
          <Route
            path="/productoverview/:id"
            element={<ProductOverview  />}
          />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
