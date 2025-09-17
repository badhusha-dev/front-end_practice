package com.cimb.wealth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioSummaryDto {
    private Double totalValue;
    private Double totalGainLoss;
    private Double totalGainLossPercentage;
    private java.util.List<AssetAllocationDto> assetAllocation;
    private java.util.List<SectorAllocationDto> sectorAllocation;
    private java.util.List<HoldingDto> topHoldings;
    private java.util.List<TransactionDto> recentTransactions;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class AssetAllocationDto {
    private String assetType;
    private Double value;
    private Double percentage;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class SectorAllocationDto {
    private String sector;
    private Double value;
    private Double percentage;
}
