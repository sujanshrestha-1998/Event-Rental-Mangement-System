import React, { useState } from "react";
import "./Package.css";  // Import the CSS file

const Menu = ({ isOpen, packageType, onEdit, onRemove, onAdd }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [foodItem, setFoodItem] = useState({ category: "", name: "" });

  const handleEditClick = () => {
    setActionType('edit');
    setShowPopup(true);
  };

  const handleRemoveClick = () => {
    setActionType('remove');
    setShowPopup(true);
  };

  const handleAddClick = () => {
    setActionType('add');
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setActionType(null);
    setFoodItem({ category: "", name: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({ ...foodItem, [name]: value });
  };

  const handlePopupSubmit = () => {
    if (actionType === 'add') {
      onAdd(packageType, foodItem);
    } else if (actionType === 'edit') {
      onEdit(packageType, foodItem);
    } else if (actionType === 'remove') {
      onRemove(packageType, foodItem.name);
    }
    handleClosePopup();
  };

  // Define menu titles based on the packageType prop
  const menuTitles = [
    { type: "gold", title: "Gold Menu" },
    { type: "silver", title: "Silver Menu" },
    { type: "platinum", title: "Platinum Menu" },
  ];

  // Define food items for each package type
  const menuItems = {
    gold: {
      Appetizer: ["Golden Arancini", "Gold Rush Spring Rolls", "24K Garlic Shrimp", "Gilded Stuffed Mushrooms", "Chicken Satay Royale"],
      "Main course": ["Grilled Gold Salmon", "Filet Mignon Supreme", "Golden Chicken Alfredo", "24 Karat Vegetable Stir Fry", "Shrimp Scampi Deluxe"],
      Dessert: ["Golden Tiramisu", "Luxurious Chocolate Lava Cake", "Gourmet Cheesecake Extravaganza", "Golden Apple Pie Delight", "Crème Brûlée Royale"],
      Snacks: ["Golden Nachos", "Royal Chicken Wings", "Golden Spinach Dip", "Majestic Mozzarella Sticks", "Buffalo Gold Bites"],
    },
    silver: {
      Appetizer: ["Silver Spring Rolls", "Platinum Spring Rolls", "Tantalizing Truffle Fries", "Gilded Guacamole", "Majestic Mango Salsa"],
      "Main course": ["Sizzling Silver Steak", "Shiny Seafood Paella", "Glamorous Grilled Chicken", "Lustrous Lemon Risotto", "Silver Surfer Salad"],
      Dessert: ["Frosty Silver Sorbet", "Spectacular Silver Sundae", "Glittering Gelato", "Moonlit Mousse", "Silver Moon Cheesecake"],
      Snacks: ["Sparkling Silver Sliders", "Shimmering Silver Shrimp Cocktail", "Twinkling Tacos", "Opulent Onion Rings", "Silver Bullet Bites"],
    },
    platinum: {
      Appetizer: ["Platinum Platter", "Prestigious Pesto Bruschetta", "Lavish Lobster Bisque", "Majestic Mushroom Tartlets", "Platinum Prawn Cocktail"],
      "Main course": ["Regal Rack of Lamb", "Prime Platinum Porterhouse", "Luxurious Lobster Linguine", "Truffle-Topped Filet Mignon", "Prestige Paella"],
      Dessert: ["Opulent Opera Cake", "Extravagant Éclair Tower", "Sumptuous Soufflé", "Pristine Pavlova", "Platinum Parfait"],
      Snacks: ["Pearly Parmesan Fries", "Glamorous Garlic Bread", "Truffle-Infused Tempura", "Decadent Duck Spring Rolls", "Luscious Lemon Arancini"],
    },
  };

  // State to track the selected menu category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle click on a menu category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle click on a food item
  const handleFoodItemClick = (event, foodItem) => {
    // Prevent default behavior to avoid triggering the handleCategoryClick function
    event.preventDefault();
    // Do nothing else for now, as food items are for display only
  };

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      {selectedCategory ? (
        // If a menu category is selected, show its food items
        <>
          <h2>{selectedCategory}</h2>
          <ul>
            {menuItems[packageType][selectedCategory].map((foodItem, index) => (
              <li key={index} onClick={(event) => handleFoodItemClick(event, foodItem)}>
                {`${index + 1}. ${foodItem}`}
              </li>
            ))}
          </ul>
          {/* Back button to return to the main menu */}
          <button onClick={() => setSelectedCategory(null)}>Back</button>
        </>
      ) : (
        // If no menu category is selected, show the menu
        <>
          {menuTitles.map((item, index) => (
            packageType === item.type && (
              <h2 key={index}>{item.title}</h2>
            )
          ))}
          <ul>
            {menuItems[packageType] && Object.keys(menuItems[packageType]).map((category, index) => (
              <li key={index} onClick={() => handleCategoryClick(category)}>
                {`${index + 1}. ${category}`}
              </li>
            ))}
          </ul>
        </>
      )}
      {/* Edit, Remove, and Add buttons */}
      <div className="action-buttons">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleRemoveClick}>Remove</button>
        <button onClick={handleAddClick}>Add</button>
      </div>

      {/* Popup for Add/Edit/Remove */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <h2>{actionType === 'add' ? 'Add Food Item' : actionType === 'edit' ? 'Edit Food Item' : 'Remove Food Item'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handlePopupSubmit(); }}>
              {actionType !== 'remove' && (
                <>
                  <label>
                    Category:
                    <input
                      type="text"
                      name="category"
                      value={foodItem.category}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Food Item:
                    <input
                      type="text"
                      name="name"
                      value={foodItem.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </>
              )}
              {actionType === 'remove' && (
                <label>
                  Food Item:
                  <input
                    type="text"
                    name="name"
                    value={foodItem.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              )}
              <button type="submit">{actionType === 'add' ? 'Add' : actionType === 'edit' ? 'Edit' : 'Remove'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;



