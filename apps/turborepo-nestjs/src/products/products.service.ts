import { Injectable } from '@nestjs/common';
import { CreateProductRequest, Product } from '@repo/types';

@Injectable()
export class ProductsService {

    private readonly products: Product[] = [];

    createProduct(createProductRequest: CreateProductRequest) {
        // Logic to create a product
        const product: Product =  {
            id: Math.random().toString(36).substring(7), // Simulating an ID for the created product
            ...createProductRequest
        };
        this.products.push(product);
        return product;
    }

    getProducts(): Product[] {
        // Logic to get all products
        return this.products;
    }
}
