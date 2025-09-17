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
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "goals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Goal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalType goalType;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal targetAmount;
    
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal currentAmount;
    
    @Column(nullable = false)
    private LocalDate targetDate;
    
    @Column(nullable = false)
    private LocalDate startDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus status;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal progressPercentage;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    public enum GoalType {
        RETIREMENT, EDUCATION, HOME_PURCHASE, EMERGENCY_FUND, VACATION, DEBT_PAYOFF, INVESTMENT
    }
    
    public enum Priority {
        LOW, MEDIUM, HIGH, CRITICAL
    }
    
    public enum GoalStatus {
        ACTIVE, COMPLETED, PAUSED, CANCELLED
    }
    
    @PrePersist
    @PreUpdate
    public void calculateProgress() {
        if (targetAmount != null && currentAmount != null && targetAmount.compareTo(BigDecimal.ZERO) > 0) {
            progressPercentage = currentAmount
                .divide(targetAmount, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));
            
            if (progressPercentage.compareTo(BigDecimal.valueOf(100)) >= 0) {
                status = GoalStatus.COMPLETED;
            }
        }
    }
}
