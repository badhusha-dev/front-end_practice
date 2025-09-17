package com.cimb.wealth.graphql;

import com.cimb.wealth.domain.User;
import com.cimb.wealth.dto.AuthResponseDto;
import com.cimb.wealth.dto.UserDto;
import com.cimb.wealth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UserResolver {

    private final UserService userService;

    @MutationMapping
    public AuthResponseDto login(@Argument("input") LoginInput input) {
        log.info("Login attempt for user: {}", input.getEmail());
        return userService.login(input.getEmail(), input.getPassword());
    }

    @MutationMapping
    public AuthResponseDto refreshToken(@Argument("refreshToken") String refreshToken) {
        return userService.refreshToken(refreshToken);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto createUser(@Argument("input") UserInput input) {
        UserDto userDto = UserDto.builder()
            .email(input.getEmail())
            .password(input.getPassword())
            .firstName(input.getFirstName())
            .lastName(input.getLastName())
            .phoneNumber(input.getPhoneNumber())
            .role(input.getRole())
            .riskProfile(input.getRiskProfile())
            .build();
        
        return userService.createUser(userDto);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN') or (hasRole('ADVISOR') and @userService.isAssignedUser(#id, authentication))")
    public UserDto updateUser(@Argument("id") Long id, @Argument("input") UserUpdateInput input) {
        UserDto userDto = UserDto.builder()
            .firstName(input.getFirstName())
            .lastName(input.getLastName())
            .phoneNumber(input.getPhoneNumber())
            .riskProfile(input.getRiskProfile())
            .active(input.getActive())
            .build();
        
        return userService.updateUser(id, userDto);
    }

    @QueryMapping
    @PreAuthorize("hasRole('ADMIN') or (hasRole('ADVISOR') and @userService.isAssignedUser(#id, authentication)) or (hasRole('CUSTOMER') and @userService.isOwnUser(#id, authentication))")
    public UserDto user(@Argument("id") Long id) {
        return userService.getUserById(id);
    }

    @QueryMapping
    public UserDto me(Authentication authentication) {
        String email = authentication.getName();
        return userService.getUserByEmail(email);
    }

    // Input classes
    public static class LoginInput {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class UserInput {
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private String phoneNumber;
        private User.Role role;
        private User.RiskProfile riskProfile;

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public User.Role getRole() { return role; }
        public void setRole(User.Role role) { this.role = role; }
        public User.RiskProfile getRiskProfile() { return riskProfile; }
        public void setRiskProfile(User.RiskProfile riskProfile) { this.riskProfile = riskProfile; }
    }

    public static class UserUpdateInput {
        private String firstName;
        private String lastName;
        private String phoneNumber;
        private User.RiskProfile riskProfile;
        private Boolean active;

        // Getters and setters
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public User.RiskProfile getRiskProfile() { return riskProfile; }
        public void setRiskProfile(User.RiskProfile riskProfile) { this.riskProfile = riskProfile; }
        public Boolean getActive() { return active; }
        public void setActive(Boolean active) { this.active = active; }
    }
}
