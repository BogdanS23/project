//package org.example.controllers;
//
//import org.example.models.Employee;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.example.models.Order;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/orders")
//public class OrderController {
//    @Autowired
//    MongoTemplate mongoTemplate;
//
//    @PostMapping
//    public Order createOrder(@RequestBody Order order) {
//        return mongoTemplate.save(order);
//    }
//
//    @GetMapping("/{id}")
//    public Order getOrderById(@PathVariable String id) {
//        return mongoTemplate.findById(id, Order.class);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Order>> getAllOrders() {
//        List<Order> list = mongoTemplate.findAll(Order.class);
//        return ResponseEntity.ok(list);
//    }
////    @GetMapping("/employees")
////    public ResponseEntity<List<Employee>> employees() {
////        List<Employee> list = mongoTemplate.findAll(Employee.class);
////        return ResponseEntity.ok(list);
////    }
//
//    @PutMapping("/{id}")
//    public Order updateOrder(@PathVariable String id, @RequestBody Order order) {
//        order.setId(id);
//        return mongoTemplate.save(order);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteOrder(@PathVariable String id) {
//        Order order = mongoTemplate.findById(id, Order.class);
//        if (order != null) {
//            mongoTemplate.remove(order);
//        }
//    }
//
//    @GetMapping("/search")
//    public List<Order> searchOrders(@RequestParam String query) {
//        // Example of a simple search query using MongoTemplate
//        return mongoTemplate.find(
//                Query.query(Criteria.where("buyerName").regex(query, "i")), // Case-insensitive regex search on the 'name' field
//                Order.class
//        );
//    }
//}
