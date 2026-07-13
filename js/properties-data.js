/**
 * BRIXSTREET REALTORS - PROPERTIES DATABASE
 * Central data registry to manage property listings across home and portfolio grids.
 */

const PROPERTIES_DATA = [
  {
    id: "m3m-jacob",
    title: "M3M Jacob & Co.",
    type: "Ultra Luxury Apartments",
    category: "residential",
    badge: "Exclusive",
    price: "₹3 - ₹9 Crore",
    location: "M3M Jacob & Co., Sector 97, Noida",
    image: "images/luxury.png",
    imageAlt: "Spacious penthouse living room with Dholera Smart City views",
    meta: [
      { icon: "fa-bed", text: "3 - 5 Bedrooms" },
      { icon: "fa-bath", text: "3 - 5 Bathrooms" },
      { icon: "fa-vector-square", text: "3,000 - 5,000 SqFt" }
    ],
    defaultClicks: 150
  },
  {
    id: "the-empire",
    title: "The Empire",
    type: "Super Luxury Apartments",
    category: "residential",
    badge: "EOI Initiated",
    price: "₹1.98 - 2.62 Crore",
    location: "Gulshan Empire, Wave City, NH-24",
    image: "images/GulshanEmpire-ExteriorImage.webp",
    imageAlt: "3 / 4 BHK Super Luxury Apartments in Premium Estates of Wave City, NH-24, by Gulshan Homes",
    meta: [
      { icon: "fa-bed", text: "3 - 4 Bedrooms" },
      { icon: "fa-bath", text: "3 - 4 Bathrooms" },
      { icon: "fa-vector-square", text: "2075 - 2750 SqFt" }
    ],
    defaultClicks: 120
  },
  {
    id: "eleque-infra",
    title: "Eleque Infra, Dholera",
    type: "Commercial / Industrial Land",
    category: "commercial",
    badge: "Industrial",
    price: "₹12 Lakh",
    location: "SIR Dholera, Smart City",
    image: "images/commercial.png",
    imageAlt: "Helix commercial business tower glass skyscraper in Dholera DSIR",
    meta: [
      { icon: "fa-vector-square", text: "100 - 250 sq yd" }
    ],
    defaultClicks: 100
  },
  {
    id: "riverfront-farmland",
    title: "The Riverfront Retreat",
    type: "Exquisite Farmlands",
    category: "farmland",
    badge: "New Launch",
    price: "₹4.50 Crore",
    location: "Yamuna Expressway River Corridor, Greater Noida",
    image: "images/farmland_riverside.png",
    imageAlt: "Lush green riverside farmland landscape with manicured orchards and mountain views",
    meta: [
      { icon: "fa-vector-square", text: "2.5 Acres" },
      { icon: "fa-water", text: "150m River Frontage" },
      { icon: "fa-tree", text: "Organic Orchards" }
    ],
    defaultClicks: 140
  }
];
