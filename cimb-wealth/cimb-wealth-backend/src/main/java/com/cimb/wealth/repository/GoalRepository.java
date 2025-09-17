package com.cimb.wealth.repository;

import com.cimb.wealth.domain.Goal;
import com.cimb.wealth.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user ORDER BY g.priority DESC, g.targetDate ASC")
    List<Goal> findByUserOrderByPriorityAndTargetDate(@Param("user") User user);
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user")
    Page<Goal> findByUser(@Param("user") User user, Pageable pageable);
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.goalType = :goalType")
    List<Goal> findByUserAndGoalType(@Param("user") User user, @Param("goalType") Goal.GoalType goalType);
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.status = :status")
    List<Goal> findByUserAndStatus(@Param("user") User user, @Param("status") Goal.GoalStatus status);
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.priority = :priority")
    List<Goal> findByUserAndPriority(@Param("user") User user, @Param("priority") Goal.Priority priority);
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.targetDate <= :targetDate AND g.status = 'ACTIVE'")
    List<Goal> findUpcomingGoalsByUser(@Param("user") User user, @Param("targetDate") LocalDate targetDate);
    
    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.progressPercentage >= :minProgress AND g.status = 'ACTIVE'")
    List<Goal> findGoalsWithMinProgress(@Param("user") User user, @Param("minProgress") Double minProgress);
    
    @Query("SELECT COUNT(g) FROM Goal g WHERE g.user = :user AND g.status = 'COMPLETED'")
    Long countCompletedGoalsByUser(@Param("user") User user);
    
    @Query("SELECT SUM(g.currentAmount) FROM Goal g WHERE g.user = :user AND g.status = 'ACTIVE'")
    Double getTotalCurrentAmountByUser(@Param("user") User user);
    
    @Query("SELECT SUM(g.targetAmount) FROM Goal g WHERE g.user = :user AND g.status = 'ACTIVE'")
    Double getTotalTargetAmountByUser(@Param("user") User user);
}
