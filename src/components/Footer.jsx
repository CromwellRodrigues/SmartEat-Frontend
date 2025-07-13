'use client';

import React from 'react';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faList, faBasketShopping, faKitchenSet, faBoxesStacked} from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between  bg-green-500 text-white text-2xl">
      
      <Link href="/summary" className="flex flex-col items-center px-6 ml-[5rem]">
      <FontAwesomeIcon icon={faList} className="text-white text-2xl mb-1" />
      <span className="text-white text-xs">Summary</span>
        </Link>
        <Link href="/" className="flex flex-col items-center px-6">
  <FontAwesomeIcon icon={faBoxesStacked} className="text-white text-2xl mb-1" />
  <span className="text-white text-xs">Inventory</span>
</Link>


    <Link href="/shopping-list" className="flex flex-col items-center px-6">
      <FontAwesomeIcon icon={faBasketShopping} className="text-white text-2xl mb-1" />
      <span className="text-white text-xs">Wishlist</span>
    </Link>
    <Link href="/recipes" className="flex flex-col items-center px-6  mr-[5rem]">
      <FontAwesomeIcon icon={faKitchenSet} className="text-white text-2xl mb-1" />
      <span className="text-white text-xs">Recipes</span>
        </Link>
      </div>
    </footer>
  );
}   


export default Footer;