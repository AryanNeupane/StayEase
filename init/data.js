const sampleListings = [
  {
    title: "Pokhara Lakeside Cottage",
    description:
      "Relax in this charming lakeside cottage overlooking the serene Phewa Lake. Enjoy stunning views of the Annapurna range and easy access to boating and local cafes.",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Pokhara",
    country: "Nepal",
  },
  {
    title: "Modern Apartment in Thamel",
    description:
      "Stay in the heart of Kathmandu's tourist hub in this stylish and modern apartment. Perfect for exploring local markets, cafes, and nightlife!",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Thamel, Kathmandu",
    country: "Nepal",
  },
  {
    title: "Peaceful Homestay in Nagarkot",
    description:
      "Unplug and unwind in this peaceful mountain cabin with breathtaking sunrise views of the Himalayas. Surrounded by nature, perfect for relaxation and trekking.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Nagarkot",
    country: "Nepal",
  },
  {
    title: "Heritage Villa in Bhaktapur",
    description:
      "Experience the rich culture and architecture of Nepal in this beautifully restored traditional Newari villa. Explore historic squares and local handicrafts nearby.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Bhaktapur",
    country: "Nepal",
  },
  {
    title: "Secluded Treehouse in Chitwan",
    description:
      "Live among the treetops in this unique treehouse retreat near Chitwan National Park. A true nature lover's paradise with wildlife safari opportunities.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Chitwan",
    country: "Nepal",
  },
  {
    title: "Beachfront Resort by Koshi River",
    description:
      "Step out onto the sandy riverbank at this beautiful Koshi Riverfront resort offering ultimate relaxation and stunning sunset views.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Saptari",
    country: "Nepal",
  },
  {
    title: "Rustic Cabin by Rara Lake",
    description:
      "Spend your days fishing and kayaking on the pristine waters of Rara Lake. This cozy cabin is perfect for outdoor enthusiasts seeking tranquility.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Rara National Park",
    country: "Nepal",
  },
  {
    title: "Luxury Penthouse with Kathmandu Valley Views",
    description:
      "Indulge in luxury living with panoramic views of Kathmandu Valley from this stunning penthouse apartment with modern amenities.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Kathmandu",
    country: "Nepal",
  },
  {
    title: "Ski Lodge near Annapurna Base Camp",
    description:
      "Experience the thrill of the Himalayas in this cozy ski lodge near popular trekking routes. Perfect for adventurers wanting a mountain retreat.",
    image:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Annapurna Region",
    country: "Nepal",
  },
  {
    title: "Wildlife Safari Lodge in Bardia",
    description:
      "Experience the thrill of the wild in this comfortable lodge near Bardia National Park. Witness wildlife like tigers, rhinos, and elephants up close.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Bardia National Park",
    country: "Nepal",
  },

  {
    title: "Heritage House in Patan",
    description:
      "Stay in a beautifully preserved traditional Newari house located in the historic Patan Durbar Square area. Dive into culture and local craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Patan",
    country: "Nepal",
  },
  {
    title: "Private Island Retreat on Phewa Lake",
    description:
      "Enjoy exclusive tranquility on a private island in Phewa Lake, Pokhara. Perfect for honeymooners or those seeking ultimate privacy with nature.",
    image:
      "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
    price: 10000,
    location: "Pokhara",
    country: "Nepal",
  },
  {
    title: "Charming Cottage in Bandipur",
    description:
      "Escape to this quaint and charming cottage nestled in the hill town of Bandipur. Enjoy traditional architecture with modern comforts.",
    image:
      "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Bandipur",
    country: "Nepal",
  },
  {
    title: "Historic Mansion in Janakpur",
    description:
      "Step back in time in this elegant historic mansion in Janakpur, rich with Mithila art and culture, close to religious and cultural landmarks.",
    image:
      "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Janakpur",
    country: "Nepal",
  },
  {
    title: "Riverside Bungalow in Chitwan",
    description:
      "Relax by the Rapti River in this beautiful bungalow with access to jungle safaris and cultural Tharu village tours.",
    image:
      "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Chitwan",
    country: "Nepal",
  },
  {
    title: "Mountain View Cabin in Langtang",
    description:
      "Enjoy breathtaking Himalayan views from this cozy cabin in Langtang National Park. Ideal for trekkers and nature lovers.",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Langtang",
    country: "Nepal",
  },
  {
    title: "Art Deco Apartment in Lazimpat",
    description:
      "Step into luxury and modern style in this stylish Art Deco apartment located in the upscale Lazimpat neighborhood of Kathmandu.",
    image:
      "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Lazimpat, Kathmandu",
    country: "Nepal",
  },
  {
    title: "Tropical Villa near Ilam",
    description:
      "Escape to a peaceful tropical villa surrounded by tea gardens in Ilam. Perfect for nature walks and quiet retreats.",
    image:
      "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Ilam",
    country: "Nepal",
  },
  {
    title: "Historic Fort Stay in Gorkha",
    description:
      "Live like royalty in this historic fort near Gorkha Durbar. Explore the history and stunning Himalayan views of this legendary kingdom.",
    image:
      "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Gorkha",
    country: "Nepal",
  },
  {
    title: "Desert Oasis Experience in Upper Mustang",
    description:
      "Discover the unique desert landscape of Upper Mustang with this luxurious oasis-style lodge, offering private pools and stunning valley views.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Upper Mustang",
    country: "Nepal",
  },

  {
    title: "Rustic Log Cabin in Rara",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the pristine natural beauty of Rara National Park, perfect for nature lovers.",
    image:
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Rara",
    country: "Nepal",
  },
  {
    title: "Beachfront Villa on Ghodaghodi Lake",
    description:
      "Enjoy serene views and crystal-clear waters at this beautiful beachfront villa on the shores of Ghodaghodi Lake, ideal for bird watching and relaxation.",
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Ghodaghodi, Sudurpashchim",
    country: "Nepal",
  },
  {
    title: "Eco-Friendly Treehouse Retreat in Ilam",
    description:
      "Stay in an eco-friendly treehouse nestled among the tea gardens of Ilam. A perfect nature escape for eco-conscious travelers.",
    image:
      "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=60",
    price: 750,
    location: "Ilam",
    country: "Nepal",
  },
  {
    title: "Historic Cottage in Tansen",
    description:
      "Experience the charm of historic Tansen in this beautifully restored cottage featuring traditional Newari architecture and a private garden.",
    image:
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Tansen",
    country: "Nepal",
  },
  {
    title: "Modern Apartment in Kathmandu",
    description:
      "Explore the vibrant capital city from this modern, centrally located apartment with easy access to shopping, restaurants, and cultural sites.",
    image:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Kathmandu",
    country: "Nepal",
  },
  {
    title: "Lakefront Cabin in Phewa Lake",
    description:
      "Spend your days relaxing by the lake in this cozy cabin at Phewa Lake with beautiful views and easy access to boating and lakeside cafes.",
    image:
      "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Pokhara",
    country: "Nepal",
  },
  {
    title: "Luxury Villa in the Himalayas",
    description:
      "Indulge in luxury in this high-end villa located in the heart of the Himalayas, offering stunning mountain views and exclusive amenities.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60",
    price: 6000,
    location: "Solukhumbu",
    country: "Nepal",
  },
  {
    title: "Ski Chalet near Annapurna",
    description:
      "Hit the slopes in style with this luxurious chalet near popular trekking and skiing areas in the Annapurna region.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Annapurna",
    country: "Nepal",
  },
  {
    title: "Secluded Beach House on Koshi River",
    description:
      "Escape to a secluded riverside house on the banks of the Koshi River. Enjoy surfing, relaxing, and reconnecting with nature.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Koshi Tappu",
    country: "Nepal",
  },
];

module.exports = {data: sampleListings};