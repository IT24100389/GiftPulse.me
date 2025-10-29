// ChristmasHub.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChristmasHub() {
  const [route, setRoute] = useState("home");

  // Sample data
  const gifts = [
    { id: 1, title: "Cozy Knitted Sweater", category: "shirts", price: 29.99, affiliate: "#" },
    { id: 2, title: "Christmas Tree Decor Set", category: "decoration", price: 19.99, affiliate: "#" },
    { id: 3, title: "Gaming Headset", category: "gadgets", price: 59.99, affiliate: "#" },
    { id: 4, title: "Leather Cap", category: "caps", price: 24.99, affiliate: "#" },
    { id: 5, title: "Festive Shoes", category: "shoes", price: 74.99, affiliate: "#" },
  ];

  const wishes = [
    { id: 1, to: "Mom", text: "Mom, may your Christmas be filled with peace and joy — love you always." },
    { id: 2, to: "Dad", text: "Dad, thank you for everything. Merry Christmas and a happy new year!" },
    { id: 3, to: "Friend", text: "Cheers to us and many more memories. Merry Christmas, mate!" },
    { id: 4, to: "Sister", text: "Sis, you're the sparkle in my holidays. Love you — Merry Christmas!" },
  ];

  const recipes = [
    { id: 1, title: "Gingerbread Cookies", category: "dessert", ingredients: ["flour","sugar","butter","ginger"], time: "40m" },
    { id: 2, title: "Roast Turkey", category: "main", ingredients: ["turkey","salt","pepper","butter"], time: "3h" },
    { id: 3, title: "Hot Chocolate", category: "drink", ingredients: ["milk","sugar","chocolate"], time: "10m" },
    { id: 4, title: "Mashed Potatoes", category: "side", ingredients: ["potato","butter","milk","salt"], time: "30m" },
  ];

  const deals = [
    { id: 1, title: "4K Smart TV", category: "tech", price: 499, oldPrice: 799, affiliate: "#" },
    { id: 2, title: "Acoustic Guitar", category: "musical", price: 129, oldPrice: 199, affiliate: "#" },
    { id: 3, title: "Gaming Chair", category: "gaming", price: 159, oldPrice: 249, affiliate: "#" },
  ];

  // Filters and state
  const [giftFilter, setGiftFilter] = useState("all");
  const [giftSearch, setGiftSearch] = useState("");
  const [wishFilter, setWishFilter] = useState("all");
  const [recipeCategory, setRecipeCategory] = useState("all");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const filteredGifts = gifts.filter(g => {
    const byCat = giftFilter === "all" || g.category === giftFilter;
    const bySearch = g.title.toLowerCase().includes(giftSearch.toLowerCase());
    return byCat && bySearch;
  });

  const filteredWishes = wishes.filter(w => wishFilter === "all" || w.to.toLowerCase() === wishFilter.toLowerCase());
  const filteredRecipes = recipes.filter(r => recipeCategory === "all" || r.category === recipeCategory);
  const allIngredients = Array.from(new Set(recipes.flatMap(r => r.ingredients)));
  const possibleRecipes = filteredRecipes.filter(r => selectedIngredients.every(si => r.ingredients.includes(si)));

  // Components
  function Header() {
    return (
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full w-10 h-10 bg-red-100 flex items-center justify-center text-red-700 font-bold">🎄</div>
            <div>
              <div className="font-semibold text-lg">ChristmasHub</div>
              <div className="text-xs text-gray-500">All things merry & bright</div>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            {['home','gifts','wishes','recipes','discounts'].map(r => (
              <button
                key={r}
                onClick={() => setRoute(r)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${route===r? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {r[0].toUpperCase() + r.slice(1)}
              </button>
            ))}
            <button className="ml-4 px-3 py-2 rounded-md border border-gray-200 text-sm">Login</button>
          </nav>
        </div>
      </header>
    );
  }

  function Home() {
    return (
      <motion.main initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">Celebrate the magic of Christmas in one place</h1>
            <p className="text-gray-600 mb-6">Find gift ideas, heartfelt wishes, festive recipes and the best discount deals — all with elegant, smooth UI and gentle animations.</p>
            <div className="flex gap-3">
              <button onClick={()=>setRoute('gifts')} className="px-5 py-3 rounded-full bg-red-600 text-white font-semibold shadow">Explore Gifts</button>
              <button onClick={()=>setRoute('recipes')} className="px-5 py-3 rounded-full border border-gray-200">View Recipes</button>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gradient-to-br from-white to-red-50 shadow-lg">
            <h3 className="font-semibold mb-3">Today’s Highlights</h3>
            <ul className="space-y-2 text-gray-700">
              <li>🎁 Trending Gift: Cozy Knitted Sweater</li>
              <li>🍪 Featured Recipe: Gingerbread Cookies</li>
              <li>💸 Top Deal: 4K Smart TV — big discount!</li>
            </ul>
          </div>
        </section>
      </motion.main>
    );
  }

  function Gifts() {
    const categories = ['all','shoes','decoration','cards','shirts','caps','gadgets'];
    return (
      <motion.main initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Top Gifts</h2>
          <div className="flex gap-2">
            <input value={giftSearch} onChange={e=>setGiftSearch(e.target.value)} placeholder="Search gifts..." className="px-3 py-2 rounded-md border" />
            <select value={giftFilter} onChange={e=>setGiftFilter(e.target.value)} className="px-3 py-2 rounded-md border">
              {categories.map(c=> <option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGifts.map(g => (
            <motion.div key={g.id} whileHover={{ y: -8 }} className="p-4 rounded-2xl border border-gray-100 bg-white">
              <div className="h-40 rounded-md bg-gray-50 flex items-center justify-center text-gray-300">Product Image</div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{g.title}</div>
                  <div className="text-sm text-gray-500">${g.price.toFixed(2)}</div>
                </div>
                <a href={g.affiliate} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-red-600 text-white text-sm">Buy</a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    );
  }

  function Wishes() {
    const categories = ['all', ...Array.from(new Set(wishes.map(w=>w.to.toLowerCase())))];
    return (
      <motion.main initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Christmas Wishes</h2>
          <select value={wishFilter} onChange={e=>setWishFilter(e.target.value)} className="px-3 py-2 rounded-md border">
            {categories.map(c=> <option key={c} value={c}>{c==='all' ? 'All' : (c[0].toUpperCase() + c.slice(1))}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishes.map(w => (
            <motion.div key={w.id} whileHover={{ y: -6 }} className="p-4 rounded-xl border border-gray-100 bg-white">
              <div className="text-xs text-gray-400">To: {w.to}</div>
              <div className="mt-2 font-medium">{w.text}</div>
              <div className="mt-4 flex gap-2">
                <button onClick={()=>navigator.clipboard.writeText(w.text)} className="px-3 py-2 rounded-md border text-sm">Copy</button>
                <button onClick={()=>window.open('https://wa.me/?text='+encodeURIComponent(w.text))} className="px-3 py-2 rounded-md border text-sm">Share</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    );
  }

  function Recipes() {
    const categories = ['all', ...Array.from(new Set(recipes.map(r=>r.category)))];
    const displayRecipes = selectedIngredients.length ? possibleRecipes : filteredRecipes;

    return (
      <motion.main initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">Christmas Recipes</h2>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <select value={recipeCategory} onChange={e=>setRecipeCategory(e.target.value)} className="px-3 py-2 rounded-md border">
              {categories.map(c=> <option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>)}
            </select>
            <button onClick={()=>setSelectedIngredients([])} className="px-3 py-2 rounded-md border">Clear Ingredients</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 p-4 rounded-xl border bg-white">
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <div className="flex flex-col gap-2">
              {allIngredients.map(ing => (
                <label key={ing} className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={selectedIngredients.includes(ing)} onChange={e=>{
                    if(e.target.checked) setSelectedIngredients(prev=>[...prev, ing]);
                    else setSelectedIngredients(prev=>prev.filter(x=>x!==ing));
                  }} />
                  <span className="capitalize">{ing}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayRecipes.map(r => (
              <motion.div key={r.id} whileHover={{ y: -6 }} className="p-4 rounded-xl border bg-white">
                <div className="font-medium text-lg">{r.title}</div>
                <div className="text-sm text-gray-500">{r.time} • {r.category}</div>
                <div className="mt-3 text-sm">Ingredients: {r.ingredients.join(', ')}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
    );
  }

  function Discounts() {
    const categories = ['all', ...Array.from(new Set(deals.map(d=>d.category)))];
    const [tab, setTab] = useState('all');
    const filtered = deals.filter(d => tab==='all' || d.category===tab);

    return (
      <motion.main initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Discountable Values</h2>
          <div className="flex gap-2">
            {categories.map(c => (
              <button key={c} onClick={()=>setTab(c)} className={`px-3 py-2 rounded-md ${tab===c ? 'bg-red-50 text-red-700' : 'border'}`}>
                {c[0].toUpperCase()+c.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(d => (
            <motion.div key={d.id} whileHover={{ y: -8 }} className="p-4 rounded-2xl border bg-white">
              <div className="h-40 rounded-md bg-gray-50 flex items-center justify-center text-gray-300">Deal Image</div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{d.title}</div>
                  <div className="text-sm text-gray-500 line-through">${d.oldPrice}</div>
                  <div className="text-lg font-semibold">${d.price}</div>
                </div>
                <a href={d.affiliate} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-red-600 text-white text-sm">Buy</a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 text-gray-800">
      <Header />
      <AnimatePresence exitBeforeEnter>
        {route === 'home' && <Home key="home" />}
        {route === 'gifts' && <Gifts key="gifts" />}
        {route === 'wishes' && <Wishes key="wishes" />}
        {route === 'recipes' && <Recipes key="recipes" />}
        {route === 'discounts' && <Discounts key="discounts" />}
      </AnimatePresence>
      <footer className="mt-12 py-8 border-t bg-white/60">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">© ChristmasHub — sample UI prototype</div>
      </footer>
    </div>
  );
}
