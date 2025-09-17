package com.cimb.wealth.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "holdings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Holding {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String ticker;
    
    @Column(nullable = false)
    private String assetName;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType assetType;
    
    @Column(nullable = false)
    private String sector;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal quantity;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal currentPrice;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal averageCost;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal marketValue;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal unrealizedGainLoss;
    
    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal unrealizedGainLossPercentage;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    
    public enum AssetType {
        STOCK, BOND, ETF, MUTUAL_FUND, REIT, CRYPTO, COMMODITY
    }
    
    @PrePersist
    @PreUpdate
    public void calculateValues() {
        if (quantity != null && currentPrice != null) {
            marketValue = quantity.multiply(currentPrice);
        }
        
        if (quantity != null && averageCost != null && currentPrice != null) {
            BigDecimal totalCost = quantity.multiply(averageCost);
            unrealizedGainLoss = marketValue.subtract(totalCost);
            
            if (totalCost.compareTo(BigDecimal.ZERO) > 0) {
                unrealizedGainLossPercentage = unrealizedGainLoss
                    .divide(totalCost, 4, BigDecimal.ROUND_HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
            }
        }
    }
}
