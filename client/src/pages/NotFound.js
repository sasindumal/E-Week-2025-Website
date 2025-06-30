import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-xl opacity-80 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link to="/events" className="btn btn-secondary">
              View Events
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
