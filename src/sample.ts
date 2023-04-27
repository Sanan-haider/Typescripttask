import fs from "fs";

interface Product {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
 
}

const dataFilePath = "./data.json";

const createProduct = (newProduct: Product): void => {
  const data: Product[] = loadDataFromFile();

  const existingProduct = data.find(
    (product: Product) => product.id === newProduct.id
  );

  if (existingProduct) {
    console.error("Product with same id already exists.");
    return;
  }

  data.push(newProduct);

  saveDataToFile(data);

  console.log("Product added");
};

const updateProduct = (id: number, update: Partial<Product>): void => {
  const data: Product[] = loadDataFromFile();

  const productIndex = data.findIndex((product: Product) => product.id === id);

  if (productIndex === -1) {
    console.error(`Product with id ${id} does not exist.`);
    return;
  }

  data[productIndex] = {
    ...data[productIndex],
    ...update,
  };

  saveDataToFile(data);

  console.log("Product updated");
};

const deleteProduct = (id: number): void => {
  const data: Product[] = loadDataFromFile();

  const productIndex = data.findIndex((product: Product) => product.id === id);

  if (productIndex === -1) {
    console.error(`Product with id ${id} does not exist.`);
    return;
  }

  data.splice(productIndex, 1);

  saveDataToFile(data);

  console.log("Product deleted");
};

const listofProducts = (): void => {
  const data: Product[] = loadDataFromFile();

  if (data.length === 0) {
    console.log("No products found");
    return;
  }

  data
    .filter((product) => product.quantity > 0)
    .sort((a, b) => b.id - a.id)
    .forEach((product) => {
      console.log(`Name: ${product.name}`);
      console.log(`Unitprice: ${product.unitPrice}`);
      console.log(`Totalprice: ${product.unitPrice * product.quantity}`);
    });
};


const loadDataFromFile = (): Product[] => {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading data from file: ${error}`);
    return [];
  }
};

const saveDataToFile = (data: Product[]): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing data to file: ${error}`);
  }
};


// createProduct({
//   id: 1,
//   name: "Book",
//   unitPrice: 10,
//   quantity: 2,

// });
// createProduct({
//   id: 2,
//   name: "Pencil",
//   unitPrice: 30,
//   quantity: 5,

// });
createProduct({
  id: 3,
  name: "Papers",
  unitPrice: 50,
  quantity: 4,

});
// createProduct({
//   id: 4,
//   name: "Bag",
//   unitPrice: 200,
//   quantity: 10,

// });

// updateProduct(3, { quantity: 4,unitPrice:25 });
// deleteProduct(3);
listofProducts(); 