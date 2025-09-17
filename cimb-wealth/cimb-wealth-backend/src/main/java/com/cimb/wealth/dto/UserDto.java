package com.cimb.wealth.dto;

import com.cimb.wealth.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private User.Role role;
    private User.RiskProfile riskProfile;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
