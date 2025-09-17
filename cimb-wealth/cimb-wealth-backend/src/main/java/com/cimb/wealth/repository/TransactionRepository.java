package com.cimb.wealth.repository;

import com.cimb.wealth.domain.Account;
import com.cimb.wealth.domain.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    Optional<Transaction> findByTransactionId(String transactionId);
    
    @Query("SELECT t FROM Transaction t WHERE t.account = :account ORDER BY t.createdAt DESC")
    Page<Transaction> findByAccountOrderByCreatedAtDesc(@Param("account") Account account, Pageable pageable);
    
    @Query("SELECT t FROM Transaction t WHERE t.account = :account AND t.transactionType = :transactionType ORDER BY t.createdAt DESC")
    Page<Transaction> findByAccountAndTransactionType(@Param("account") Account account, 
                                                     @Param("transactionType") Transaction.TransactionType transactionType, 
                                                     Pageable pageable);
    
    @Query("SELECT t FROM Transaction t WHERE t.account = :account AND t.ticker = :ticker ORDER BY t.createdAt DESC")
    List<Transaction> findByAccountAndTicker(@Param("account") Account account, @Param("ticker") String ticker);
    
    @Query("SELECT t FROM Transaction t WHERE t.account = :account AND t.status = :status ORDER BY t.createdAt DESC")
    Page<Transaction> findByAccountAndStatus(@Param("account") Account account, 
                                            @Param("status") Transaction.TransactionStatus status, 
                                            Pageable pageable);
    
    @Query("SELECT t FROM Transaction t WHERE t.account = :account AND t.createdAt BETWEEN :startDate AND :endDate ORDER BY t.createdAt DESC")
    Page<Transaction> findByAccountAndDateRange(@Param("account") Account account, 
                                               @Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate, 
                                               Pageable pageable);
    
    @Query("SELECT SUM(t.totalAmount) FROM Transaction t WHERE t.account = :account AND t.transactionType = :transactionType")
    Double getTotalAmountByAccountAndType(@Param("account") Account account, 
                                         @Param("transactionType") Transaction.TransactionType transactionType);
    
    boolean existsByTransactionId(String transactionId);
}
