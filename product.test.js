const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe('Adding Products', () => {
    it('should add a product', () => {
        addProduct('Apple', 2.5);
        expect(getProducts()).toEqual([{ id: 1, name: 'Apple', price: 2.5 }]);
    });

    it('should increment the id by 1 each time a product is added', () => {
        addProduct('Apple', 2.5);
        addProduct('Banana', 1.5);
        expect(getProducts()).toEqual([
            { id: 1, name: 'Apple', price: 2.5 },
            { id: 2, name: 'Banana', price: 1.5 },
        ]);
    });

    it('should throw an error if name or price is not defined', () => {
        expect(() => addProduct()).toThrow('Name and price are required');
        expect(() => addProduct('Apple')).toThrow('Name and price are required');
    });

    it('should throw an error if the product already exists', () => {
        addProduct('Apple', 2.5);
        expect(() => addProduct('Apple', 2.5)).toThrow('Product already exists');
    });
});

describe('Removing Products', () => {
    it('should remove a product', () => {
        addProduct('Apple', 2.5);
        const productId = getProducts()[0].id;
        removeProduct(productId);
        expect(getProducts()).toEqual([]);
    });

    it('should throw an error if the product does not exist', () => {
        expect(() => removeProduct(999)).toThrow('Product not found');
    });
});

describe('Getting a Product', () => {
    it('should get a product by id', () => {
        addProduct('Apple', 2.5);
        const productId = getProducts()[0].id;
        expect(getProduct(productId)).toEqual({ id: 1, name: 'Apple', price: 2.5 });
    });

    it('should throw an error if the product does not exist', () => {
        expect(() => getProduct(999)).toThrow('Product not found');
    });
});

describe('Updating Products', () => {
    it('should update a product by id', () => {
        addProduct('Apple', 2.5);
        const productId = getProducts()[0].id;
        updateProduct(productId, 'Green Apple', 3.0);
        expect(getProduct(productId)).toEqual({ id: 1, name: 'Green Apple', price: 3.0 });
    });

    it('should throw an error if the product does not exist', () => {
        expect(() => updateProduct(999, 'Apple', 2.5)).toThrow('Product not found');
    });

    it('should only update the price if no name is given', () => {
        addProduct('Apple', 2.5);
        const productId = getProducts()[0].id;
        updateProduct(productId, undefined, 3.0);
        expect(getProduct(productId)).toEqual({ id: 1, name: 'Apple', price: 3.0 });
    });

    it('should only update the name if no price is given', () => {
        addProduct('Apple', 2.5);
        const productId = getProducts()[0].id;
        updateProduct(productId, 'Green Apple', undefined);
        expect(getProduct(productId)).toEqual({ id: 1, name: 'Green Apple', price: 2.5 });
    });
});
