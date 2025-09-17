package com.cimb.wealth.dto;

import com.cimb.wealth.domain.Holding;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HoldingDto {
    private Long id;
    private String ticker;
    private String assetName;
    private Holding.AssetType assetType;
    private String sector;
    private BigDecimal quantity;
    private BigDecimal currentPrice;
    private BigDecimal averageCost;
    private BigDecimal marketValue;
    private BigDecimal unrealizedGainLoss;
    private BigDecimal unrealizedGainLossPercentage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long accountId;
}
