const mockOrders = [
  {
    id: "ORD-1001",
    date: "2025-10-29",
    status: "Delivered",
    statusHistory: [
      { step: "Order Placed", time: "2025-10-29 09:12" },
      { step: "Packed", time: "2025-10-30 07:30" },
      { step: "Shipped", time: "2025-10-31 12:40" },
      { step: "Out for Delivery", time: "2025-11-01 08:20" },
      { step: "Delivered", time: "2025-11-01 16:05" },
    ],
    items: [
      {
        sku: "P-100",
        title: "Noise-Cancelling Headphones",
        qty: 1,
        price: 3999,
        image: "https://via.placeholder.com/80",
      },
    ],
    shipping: 49,
    tax: 72,
    discount: 0,
    total: 4120,
    courier: { name: "FastShip", trackingId: "FS123456789" },
    billingAddress: "12, MG Road, Bangalore, India",
    shippingAddress: "12, MG Road, Bangalore, India",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1099",
    date: "2025-11-06",
    status: "Shipped",
    statusHistory: [
      { step: "Order Placed", time: "2025-11-06 10:00" },
      { step: "Packed", time: "2025-11-06 16:10" },
      { step: "Shipped", time: "2025-11-07 09:00" },
    ],
    items: [
      {
        sku: "P-215",
        title: "Running Shoes",
        qty: 1,
        price: 2499,
        image: "https://via.placeholder.com/80",
      },
      {
        sku: "P-217",
        title: "Sports Socks (Pack of 3)",
        qty: 1,
        price: 299,
        image: "https://via.placeholder.com/80",
      },
    ],
    shipping: 0,
    tax: 195,
    discount: 150,
    total: 2843,
    courier: { name: "ShipNow", trackingId: "SN987654321" },
    billingAddress: "Flat 5, Residency Road, Pune",
    shippingAddress: "Flat 5, Residency Road, Pune",
    paymentMethod: "Credit Card (**** 4242)",
  },
];

export default mockOrders