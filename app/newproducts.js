const newProducts = [
  {
    id: 1,
    name: "Classic Round Neck Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 499.0,
    stock: 120,
    category: "men",
    sub_category: "roundneck",
    variants: [
      { size: "M", color: "Black", stock: 40 },
      { size: "L", color: "White", stock: 30 },
    ],
    reviews: [{ user_id: 101, rating: 5, comment: "Great fit!" }],
    average_rating: 4.5,
    coupon: {
      code: "NAVAFEST20",
      discount_percent: 20,
      expires_at: "2025-12-01T00:00:00Z",
    },
    flags: {
      is_featured: true,
      is_hidden: false,
    },
  },
  {
    id: 2,
    name: "V-Neck Comfort Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 549.0,
    stock: 85,
    category: "women",
    sub_category: "vneck",
    variants: [
      { size: "S", color: "Blue", stock: 25 },
      { size: "M", color: "White", stock: 30 },
    ],
    reviews: [{ user_id: 102, rating: 4, comment: "Soft and breathable." }],
    average_rating: 4.0,
    coupon: {
      code: "WOMEN10",
      discount_percent: 10,
      expires_at: "2025-11-30T00:00:00Z",
    },
    flags: {
      is_featured: false,
      is_hidden: false,
    },
  },
  {
    id: 3,
    name: "Henley Collar Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 599.0,
    stock: 60,
    category: "men",
    sub_category: "henleycollar",
    variants: [
      { size: "L", color: "Green", stock: 20 },
      { size: "XL", color: "Gray", stock: 15 },
    ],
    reviews: [
      { user_id: 103, rating: 5, comment: "Stylish and comfy." },
      { user_id: 104, rating: 4, comment: "Good value." },
    ],
    average_rating: 4.5,
    coupon: null,
    flags: {
      is_featured: true,
      is_hidden: false,
    },
  },
  {
    id: 4,
    name: "Graphic Print Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 649.0,
    stock: 95,
    category: "women",
    sub_category: "graphicprint",
    variants: [
      { size: "M", color: "Red", stock: 35 },
      { size: "L", color: "Black", stock: 30 },
    ],
    reviews: [],
    average_rating: null,
    coupon: {
      code: "GRAPHIC15",
      discount_percent: 15,
      expires_at: "2025-12-10T00:00:00Z",
    },
    flags: {
      is_featured: false,
      is_hidden: false,
    },
  },
  {
    id: 5,
    name: "Polo Neck Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 699.0,
    stock: 70,
    category: "men",
    sub_category: "poloneck",
    variants: [
      { size: "M", color: "White", stock: 25 },
      { size: "L", color: "Blue", stock: 20 },
    ],
    reviews: [{ user_id: 105, rating: 3, comment: "Decent quality." }],
    average_rating: 3.0,
    coupon: null,
    flags: {
      is_featured: false,
      is_hidden: false,
    },
  },
  {
    id: 6,
    name: "New Arrival Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 799.0,
    stock: 50,
    category: "women",
    sub_category: "newarrivals",
    variants: [
      { size: "S", color: "Pink", stock: 20 },
      { size: "M", color: "Purple", stock: 15 },
    ],
    reviews: [{ user_id: 106, rating: 5, comment: "Love the color!" }],
    average_rating: 5.0,
    coupon: {
      code: "NEW20",
      discount_percent: 20,
      expires_at: "2025-11-25T00:00:00Z",
    },
    flags: {
      is_featured: true,
      is_hidden: false,
    },
  },
  {
    id: 7,
    name: "Best Seller Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 749.0,
    stock: 100,
    category: "men",
    sub_category: "bestsellers",
    variants: [
      { size: "M", color: "Black", stock: 40 },
      { size: "L", color: "Gray", stock: 30 },
    ],
    reviews: [{ user_id: 107, rating: 4, comment: "Popular for a reason." }],
    average_rating: 4.0,
    coupon: null,
    flags: {
      is_featured: true,
      is_hidden: false,
    },
  },
  {
    id: 8,
    name: "Round Neck Cotton Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 499.0,
    stock: 90,
    category: "women",
    sub_category: "roundneck",
    variants: [
      { size: "S", color: "White", stock: 30 },
      { size: "M", color: "Yellow", stock: 25 },
    ],
    reviews: [],
    average_rating: null,
    coupon: {
      code: "COTTON10",
      discount_percent: 10,
      expires_at: "2025-12-05T00:00:00Z",
    },
    flags: {
      is_featured: false,
      is_hidden: false,
    },
  },
  {
    id: 9,
    name: "V-Neck Stretch Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 579.0,
    stock: 65,
    category: "men",
    sub_category: "vneck",
    variants: [
      { size: "L", color: "Blue", stock: 20 },
      { size: "XL", color: "Black", stock: 15 },
    ],
    reviews: [{ user_id: 108, rating: 4, comment: "Nice stretch and fit." }],
    average_rating: 4.0,
    coupon: null,
    flags: {
      is_featured: false,
      is_hidden: false,
    },
  },
  {
    id: 10,
    name: "Henley Tee with Buttons",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 629.0,
    stock: 55,
    category: "women",
    sub_category: "henleycollar",
    variants: [
      { size: "M", color: "Green", stock: 20 },
      { size: "L", color: "Gray", stock: 15 },
    ],
    reviews: [{ user_id: 109, rating: 5, comment: "Elegant and comfy." }],
    average_rating: 5.0,
    coupon: {
      code: "HENLEY25",
      discount_percent: 25,
      expires_at: "2025-12-15T00:00:00Z",
    },
    flags: {
      is_featured: true,
      is_hidden: false,
    },
  },
  {
    id: 11,
    name: "Classic Round Neck Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 499.0,
    stock: 120,
    category: "men",
    sub_category: "roundneck",
    variants: [
      { size: "M", color: "Black", stock: 40 },
      { size: "L", color: "White", stock: 30 },
    ],
    reviews: [{ user_id: 101, rating: 5, comment: "Great fit!" }],
    average_rating: 4.5,
    coupon: {
      code: "NAVAFEST20",
      discount_percent: 20,
      expires_at: "2025-12-01T00:00:00Z",
    },
    flags: {
      is_featured: true,
      is_hidden: false,
    },
  },
  {
    id: 12,
    name: "V-Neck Comfort Tee",
    imageUrl:
      "https://www.placeholderimage.online/placeholder/120/160/f3f4f6/1f2937?font=Montserrat.svg",
    price: 549.0,
    stock: 85,
    category: "women",
    sub_category: "vneck",
    variants: [
      { size: "S", color: "Blue", stock: 25 },
      { size: "M", color: "White", stock: 30 },
    ],
    reviews: [{ user_id: 102, rating: 4, comment: "Soft and breathable." }],
    average_rating: 4.0,
    coupon: {
      code: "WOMEN10",
      discount_percent: 10,
      expires_at: "2025-11-30T00:00:00Z",
    },
    flags: {
      is_featured: false,
      is_hidden: false,
    },
  },
];

export default newProducts;
