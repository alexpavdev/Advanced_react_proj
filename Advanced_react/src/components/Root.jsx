import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

// root component of our application
// getCategoryNameFromId function is defined within the Root component. 
//It takes an id as a parameter and searches for a category in the categoryOptions array that matches the given id.
export const Root = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const getCategoryNameFromId = (id) =>
    categoryOptions.find((category) => category.id === id)?.name || "";

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
      setCategoryOptions(categories);
    })();
  }, []);

  return (
    <Box>
      <Navigation />
      <Outlet context={{ categoryOptions, getCategoryNameFromId }} />
    </Box>
  );
};
