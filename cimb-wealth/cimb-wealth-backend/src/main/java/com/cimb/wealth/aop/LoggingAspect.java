package com.cimb.wealth.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Around("execution(* com.cimb.wealth.service.*.*(..)) || execution(* com.cimb.wealth.graphql.*.*(..))")
    public Object logMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        
        long startTime = System.currentTimeMillis();
        
        log.info("Entering method: {}.{} with args: {}", 
            className, methodName, maskSensitiveData(joinPoint.getArgs()));
        
        try {
            Object result = joinPoint.proceed();
            long executionTime = System.currentTimeMillis() - startTime;
            
            log.info("Exiting method: {}.{} with execution time: {}ms", 
                className, methodName, executionTime);
            
            return result;
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            
            log.error("Exception in method: {}.{} after {}ms: {}", 
                className, methodName, executionTime, e.getMessage());
            
            throw e;
        }
    }

    private Object[] maskSensitiveData(Object[] args) {
        if (args == null) {
            return args;
        }
        
        return Arrays.stream(args)
            .map(arg -> {
                if (arg != null && arg.toString().contains("password")) {
                    return "***MASKED***";
                }
                if (arg != null && arg.toString().contains("token")) {
                    return "***MASKED***";
                }
                return arg;
            })
            .toArray();
    }
}
