import { useState } from 'react';
import './Submit.css'

export default function Submit() {
  const [newInventory, setNewInventory] = useState({
    part_name: '',
    site_id: '',
    description: '',
    quantity: '',
    last_updated: '',
  });

  const handleSubmit = (elm) => {
    elm.preventDefault(); // Prevent default form submission

    if (
      !newInventory.part_name ||
      !newInventory.site_id ||
      !newInventory.description ||
      !newInventory.quantity
    ) {
      alert('Please enter all inventory details.');
      return;
    }

    fetch('http://localhost:8081/inventory', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        part_name: newInventory.part_name,
        site_id: newInventory.site_id,
        description: newInventory.description,
        quantity: newInventory.quantity,
        last_updated: new Date().toISOString(),
       }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Inventory added!');
          return res.json();
        } else {
          alert('Failed to add Inventory.');
        }
      })
      .then((data) => {
        console.log(data);
      });

    // Clear the input field after submission
    setNewInventory({
      part_name: '',
      site_id: '',
      description: '',
      quantity: '',
      last_updated: '',
    });
  };

  return (
    <>
      <h2 className="form-title">Add Inventory</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label htmlFor="part_name">Part Name</label>
          <input
            type="text"
            id="part_name"
            placeholder="Enter part name"
            value={newInventory.part_name}
            onChange={(elm) =>
              setNewInventory({ ...newInventory, part_name: elm.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="site_id">Site Name</label>
          <input
            type="text"
            id="site_id"
            placeholder="Enter site name"
            value={newInventory.site_id}
            onChange={(elm) =>
              setNewInventory({ ...newInventory, site_id: elm.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            value={newInventory.description}
            onChange={(elm) =>
              setNewInventory({ ...newInventory, description: elm.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            value={newInventory.quantity}
            onChange={(elm) =>
              setNewInventory({ ...newInventory, quantity: elm.target.value })
            }
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
