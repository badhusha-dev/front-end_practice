package com.cimb.wealth.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@Slf4j
public class SecurityAuditAspect {

    @Before("execution(* com.cimb.wealth.service.UserService.login(..)) || " +
            "execution(* com.cimb.wealth.service.UserService.createUser(..)) || " +
            "execution(* com.cimb.wealth.service.*.createTransaction(..)) || " +
            "execution(* com.cimb.wealth.service.*.generateReport(..))")
    public void logSecurityEvent(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication != null ? authentication.getName() : "ANONYMOUS";
        
        log.info("SECURITY AUDIT: User '{}' executed sensitive operation: {}.{} at {}", 
            username, className, methodName, LocalDateTime.now());
    }
}
