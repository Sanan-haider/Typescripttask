import fs from 'fs';

interface Product {
  id: string;
  name: string;
  unit_price: number;
  quantity: number;
  created_date: Date; // can be number (unix time) if you want to
}
