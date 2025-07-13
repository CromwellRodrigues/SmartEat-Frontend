import Link from "next/link";
import React from "react";

const NoInventoryFound = () => (
  <div className="text-center py-8">
    <p className="text-gray-600">
      No items in your inventory yet.
    </p>
    <Link
      href="/inventory"
      className="text-green-600 hover:text-green-700 font-semibold"
    >
      Add your first item →
    </Link>
  </div>
);

export default NoInventoryFound;