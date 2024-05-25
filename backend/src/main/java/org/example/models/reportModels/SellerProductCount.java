package org.example.models.reportModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerProductCount {
    private String sellerId;
    private String sellerName;
    private String sellerEmail;
    private long productCount;
}
