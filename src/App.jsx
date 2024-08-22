import React, { useState } from 'react';
const nestedData = [
  {
    id: 1,
    label: "1",
    children: [
      {
        id: 2,
        label: "1.1",
        children: [
          { id: 3, label: "1.1.1" },
          { id: 4, label: "1.1.2" }
        ]
      },
      { id: 5, label: "1.2" }
    ]
  },
  {
    id: 6,
    label: "2",
    children: [
      { id: 7, label: "2.1" }
    ]
  }
];

const CheckboxTree = ({ data, checkedItems, handleChange }) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={checkedItems.includes(item.id)}
            onChange={() => handleChange(item)}
          />
          {item.label}
          {item.children && item.children.length > 0 && (
            <CheckboxTree
              data={item.children}
              checkedItems={checkedItems}
              handleChange={handleChange}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleChange = (item) => {
    const isChecked = checkedItems.includes(item.id);
    const newCheckedItems = new Set(checkedItems);

    const toggleItemAndChildren = (item) => {
      if (isChecked) {
        newCheckedItems.delete(item.id);
      } else {
        newCheckedItems.add(item.id);
      }
      item.children?.forEach(toggleItemAndChildren);
    };

    toggleItemAndChildren(item);
    setCheckedItems(Array.from(newCheckedItems));
  };

  return (
    <div>
      <h1>Nested Checkbox List</h1>
      <CheckboxTree
        data={nestedData}
        checkedItems={checkedItems}
        handleChange={handleChange}
      />
    </div>
  );
};

export default App;
