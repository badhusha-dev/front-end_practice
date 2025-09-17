package com.cimb.wealth.repository;

import com.cimb.wealth.domain.Account;
import com.cimb.wealth.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    
    Optional<Account> findByAccountNumber(String accountNumber);
    
    List<Account> findByUserAndActiveTrue(User user);
    
    @Query("SELECT a FROM Account a WHERE a.user = :user AND a.active = true")
    Page<Account> findByUser(@Param("user") User user, Pageable pageable);
    
    @Query("SELECT a FROM Account a WHERE a.user = :user AND a.accountType = :accountType AND a.active = true")
    List<Account> findByUserAndAccountType(@Param("user") User user, @Param("accountType") Account.AccountType accountType);
    
    @Query("SELECT SUM(a.balance) FROM Account a WHERE a.user = :user AND a.active = true")
    Double getTotalBalanceByUser(@Param("user") User user);
    
    boolean existsByAccountNumber(String accountNumber);
}
