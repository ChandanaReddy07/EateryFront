import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MenuItemCard from "./MenuItem";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
];

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Z"); // Default to show all items
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = useCallback(() => {
    // Check if the screen width is less than or equal to 768 pixels
    setIsMobileView(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Fetch menu items from the backend API
    axios.get("https://eatery-syux.onrender.com/menu/menu").then((response) => {
      setMenuItems(response.data);
      setFilteredItems(response.data);
    });
  }, []);

  // Filter menu items based on the selected category
  useEffect(() => {
    if (selectedCategory === "Z") {
      // If "All Items" is selected, show all menu items
      setFilteredItems(menuItems);
    } else {
      // Filter menu items based on the selected category
      const filtered = menuItems.filter((item) => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  }, [selectedCategory, menuItems]);

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for mobile view
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container2">
      <h2 style={{fontFamily: "Dancing Script, cursive",textAlign:"center",fontSize:"2rem"}}>Tasty Food</h2>
      <div className="containerb">
        
        {[["All Items","Z"], ["Starters","A"], ["Main Courses","C"], ["Beverages","B"], ["Desserts","D"]].map(
          (category) => (
            <div key={category[1]}>
              <button
                className={`btn btn-2 ${
                  selectedCategory === category[1] ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category[1])}
              >
                {category[0]}
              </button>
            </div>
          )
        )}
 

      {isMobileView ? (
        // Mobile view: Categories are static, only items are scrollable
        <div className="mobile-items-container">
          {filteredItems.map((item) => (
            <MenuItemCard key={item._id} data={item} />
          ))}
        </div>
      ) : (
        // Desktop view: Use the Carousel component
        <Carousel breakPoints={breakPoints}>
          {filteredItems.map((item) => (
            <div key={item._id}>
              <MenuItemCard key={item._id} data={item} />
            </div>
          ))}
        </Carousel>
      )}
           </div>
    </div>
  );
}

export default Menu;
