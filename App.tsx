/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import AdminConfig from './components/AdminConfig';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import { PRODUCTS, JOURNAL_ARTICLES } from './constants';
import { Product, JournalArticle, ViewState } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Stores the section id to scroll to after a view change
  const pendingScrollRef = useRef<string | null>(null);

  // Scroll to the pending section once the home view has mounted
  useEffect(() => {
    if (view.type === 'home' && pendingScrollRef.current !== null) {
      const targetId = pendingScrollRef.current;
      pendingScrollRef.current = null;
      scrollToSection(targetId);
    }
  }, [view]);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we are not home, go home first and defer the scroll to the useEffect above
    if (view.type !== 'home') {
      pendingScrollRef.current = targetId;
      setView({ type: 'home' });
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#FFF1F2] font-sans text-[#4C0519] selection:bg-rose-200 selection:text-[#4C0519]">
      {view.type !== 'checkout' && (
        <Navbar 
            onNavClick={handleNavClick} 
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ProductGrid 
              products={products}
              onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
            }} />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
              pendingScrollRef.current = 'products';
              setView({ type: 'home' });
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
            />
        )}

        {view.type === 'admin' && (
          <AdminConfig 
            products={products}
            onBack={() => setView({ type: 'home' })}
            onProductClick={(p) => setView({ type: 'product', product: p })}
            onAddProduct={(newProduct) => setProducts([...products, newProduct])}
            onUpdateProduct={(updatedProduct) => setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))}
          />
        )}
      </main>

      {view.type !== 'checkout' && (
        <Footer 
            onLinkClick={handleNavClick} 
            onAdminClick={() => setView({ type: 'admin' })}
        />
      )}
      
      <Assistant />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;
