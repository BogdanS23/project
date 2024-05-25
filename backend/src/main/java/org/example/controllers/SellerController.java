//package org.example.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.env.ConfigurableEnvironment;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.web.bind.annotation.*;
//import org.example.models.Seller;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/sellers")
//public class SellerController {
//    @Autowired
//    MongoTemplate mongoTemplate = AuthController.mongoTemplate;
//
//    @PostMapping
//    public Seller createSeller(@RequestBody Seller seller) {
//        return mongoTemplate.save(seller);
//    }
//
//    @GetMapping("/{id}")
//    public Seller getSellerById(@PathVariable String id) {
//        return mongoTemplate.findById(id, Seller.class);
//    }
//
//    @GetMapping
//    public List<Seller> getAllSellers(@RequestParam(required = false) String query) {
//        //System.out.println("Current Database URL: " + env.getProperty("spring.data.mongodb.uri"));
//        if (query != null) {
//            // Implement your search logic using MongoTemplate
//            mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), Seller.class);
//            // This is just a placeholder, you need to replace it with your actual search logic
//            return mongoTemplate.findAll(Seller.class); // Placeholder, returns all sellers for demonstration
//        }
//        return mongoTemplate.findAll(Seller.class);
//    }
//
//    @PutMapping("/{id}")
//    public Seller updateSeller(@PathVariable String id, @RequestBody Seller seller) {
//        seller.setId(id);
//        return mongoTemplate.save(seller);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteSeller(@PathVariable String id) {
//        Seller seller = mongoTemplate.findById(id, Seller.class);
//        if (seller != null) {
//            mongoTemplate.remove(seller);
//        }
//    }
//}
