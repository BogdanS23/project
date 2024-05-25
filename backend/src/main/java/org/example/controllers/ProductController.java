//package org.example.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.web.bind.annotation.*;
//import org.example.models.Product;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/products")
//public class ProductController {
//    @Autowired
//    MongoTemplate mongoTemplate = AuthController.mongoTemplate;
//
//    @PostMapping
//    public Product createProduct(@RequestBody Product product) {
//        return mongoTemplate.save(product);
//    }
//
//    @GetMapping("/{id}")
//    public Product getProductById(@PathVariable String id) {
//        return mongoTemplate.findById(id, Product.class);
//    }
//
//    @GetMapping
//    public List<Product> getAllProducts(@RequestParam(required = false) String sortBy,
//                                        @RequestParam(required = false) String order) {
//        Sort.Direction direction = Sort.Direction.ASC;
//        if (order != null && order.equalsIgnoreCase("desc")) {
//            direction = Sort.Direction.DESC;
//        }
//        Sort sort = Sort.by(direction, sortBy != null ? sortBy : "_id"); // Default sort by "_id" field if sortBy is not provided
//        return mongoTemplate.find(org.springframework.data.mongodb.core.query.Query.query(new org.springframework.data.mongodb.core.query.Criteria()).with(sort), Product.class);
//    }
//
//    @PutMapping("/{id}")
//    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
//        product.setId(id);
//        return mongoTemplate.save(product);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteProduct(@PathVariable String id) {
//        Product product = mongoTemplate.findById(id, Product.class);
//        if (product != null) {
//            mongoTemplate.remove(product);
//        }
//    }
//}
