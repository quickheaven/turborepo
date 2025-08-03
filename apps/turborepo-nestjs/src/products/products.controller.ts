import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductRequest } from '@repo/types';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Post()
    async createProduct(@Body() createProductRequest: CreateProductRequest) {
        return this.productService.createProduct(createProductRequest);
    }

    @Get()
    async getProducts() {
        return this.productService.getProducts();
    }
}
