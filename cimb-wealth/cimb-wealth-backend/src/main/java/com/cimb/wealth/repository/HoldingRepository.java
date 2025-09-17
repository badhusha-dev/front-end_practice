package com.cimb.wealth.repository;

import com.cimb.wealth.domain.Account;
import com.cimb.wealth.domain.Holding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoldingRepository extends JpaRepository<Holding, Long> {
    
    List<Holding> findByAccountAndTicker(Account account, String ticker);
    
    @Query("SELECT h FROM Holding h WHERE h.account = :account ORDER BY h.marketValue DESC")
    List<Holding> findByAccountOrderByMarketValueDesc(@Param("account") Account account);
    
    @Query("SELECT h FROM Holding h WHERE h.account = :account")
    Page<Holding> findByAccount(@Param("account") Account account, Pageable pageable);
    
    @Query("SELECT h FROM Holding h WHERE h.ticker = :ticker")
    List<Holding> findByTicker(@Param("ticker") String ticker);
    
    @Query("SELECT h FROM Holding h WHERE h.assetType = :assetType")
    Page<Holding> findByAssetType(@Param("assetType") Holding.AssetType assetType, Pageable pageable);
    
    @Query("SELECT h FROM Holding h WHERE h.sector = :sector")
    Page<Holding> findBySector(@Param("sector") String sector, Pageable pageable);
    
    @Query("SELECT h FROM Holding h WHERE h.ticker LIKE %:searchTerm% OR h.assetName LIKE %:searchTerm%")
    Page<Holding> findByTickerOrAssetNameContaining(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT SUM(h.marketValue) FROM Holding h WHERE h.account = :account")
    Double getTotalMarketValueByAccount(@Param("account") Account account);
    
    @Query("SELECT h.sector, SUM(h.marketValue) FROM Holding h WHERE h.account = :account GROUP BY h.sector")
    List<Object[]> getSectorAllocationByAccount(@Param("account") Account account);
}
