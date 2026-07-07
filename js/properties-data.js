/**
 * BRIXSTREET REALTORS - PROPERTIES DATABASE
 * Central data registry to manage property listings across home and portfolio grids.
 */

const PROPERTIES_DATA = [
  {
    id: "m3m-jacob",
    title: "M3M Jacob & Co.",
    type: "Ultra Luxury Appartments",
    category: "luxury",
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
    type: "Super Luxury Appartments",
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
    location: "Estates 4,5,6,7 and 8, DSIR Dholera Smart City",
    image: "images/commercial.png",
    imageAlt: "Helix commercial business tower glass skyscraper in Gurugram DLF Cybercity",
    meta: [
      { icon: "fa-vector-square", text: "100 - 250 sq yd" }
    ],
    defaultClicks: 100
  }
];
