package com.cimb.wealth.dto;

import com.cimb.wealth.domain.Transaction;
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
public class TransactionDto {
    private Long id;
    private String transactionId;
    private Transaction.TransactionType transactionType;
    private String ticker;
    private String assetName;
    private BigDecimal quantity;
    private BigDecimal price;
    private BigDecimal amount;
    private BigDecimal fees;
    private BigDecimal totalAmount;
    private String description;
    private Transaction.TransactionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long accountId;
}
