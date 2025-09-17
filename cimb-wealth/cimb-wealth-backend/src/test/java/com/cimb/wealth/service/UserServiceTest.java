package com.cimb.wealth.service;

import com.cimb.wealth.domain.User;
import com.cimb.wealth.repository.UserRepository;
import com.cimb.wealth.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
            .id(1L)
            .email("test@cimb.com")
            .firstName("Test")
            .lastName("User")
            .role(User.Role.CUSTOMER)
            .riskProfile(User.RiskProfile.MODERATE)
            .active(true)
            .build();

        authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@cimb.com");
    }

    @Test
    void login_ShouldReturnAuthResponse_WhenCredentialsAreValid() {
        // Given
        String email = "test@cimb.com";
        String password = "password123";
        String token = "jwt-token";
        String refreshToken = "refresh-token";

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(authentication);
        when(jwtTokenProvider.generateToken(authentication)).thenReturn(token);
        when(jwtTokenProvider.generateRefreshToken(email)).thenReturn(refreshToken);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));

        // When
        var result = userService.login(email, password);

        // Then
        assertNotNull(result);
        assertEquals(token, result.getToken());
        assertEquals(refreshToken, result.getRefreshToken());
        assertEquals(testUser.getEmail(), result.getUser().getEmail());
        
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenProvider).generateToken(authentication);
        verify(jwtTokenProvider).generateRefreshToken(email);
        verify(userRepository).findByEmail(email);
    }

    @Test
    void createUser_ShouldCreateUser_WhenEmailIsUnique() {
        // Given
        var userDto = com.cimb.wealth.dto.UserDto.builder()
            .email("new@cimb.com")
            .password("password123")
            .firstName("New")
            .lastName("User")
            .role(User.Role.CUSTOMER)
            .riskProfile(User.RiskProfile.MODERATE)
            .build();

        User newUser = User.builder()
            .email(userDto.getEmail())
            .password("encoded-password")
            .firstName(userDto.getFirstName())
            .lastName(userDto.getLastName())
            .role(userDto.getRole())
            .riskProfile(userDto.getRiskProfile())
            .active(true)
            .build();

        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(userDto.getPassword())).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        // When
        var result = userService.createUser(userDto);

        // Then
        assertNotNull(result);
        assertEquals(userDto.getEmail(), result.getEmail());
        assertEquals(userDto.getFirstName(), result.getFirstName());
        assertEquals(userDto.getLastName(), result.getLastName());
        
        verify(userRepository).existsByEmail(userDto.getEmail());
        verify(passwordEncoder).encode(userDto.getPassword());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void createUser_ShouldThrowException_WhenEmailExists() {
        // Given
        var userDto = com.cimb.wealth.dto.UserDto.builder()
            .email("existing@cimb.com")
            .password("password123")
            .firstName("Existing")
            .lastName("User")
            .role(User.Role.CUSTOMER)
            .riskProfile(User.RiskProfile.MODERATE)
            .build();

        when(userRepository.existsByEmail(userDto.getEmail())).thenReturn(true);

        // When & Then
        assertThrows(RuntimeException.class, () -> userService.createUser(userDto));
        
        verify(userRepository).existsByEmail(userDto.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        // Given
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

        // When
        var result = userService.getUserById(userId);

        // Then
        assertNotNull(result);
        assertEquals(testUser.getEmail(), result.getEmail());
        assertEquals(testUser.getFirstName(), result.getFirstName());
        
        verify(userRepository).findById(userId);
    }

    @Test
    void getUserById_ShouldThrowException_WhenUserNotFound() {
        // Given
        Long userId = 999L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> userService.getUserById(userId));
        
        verify(userRepository).findById(userId);
    }

    @Test
    void updateUser_ShouldUpdateUser_WhenUserExists() {
        // Given
        Long userId = 1L;
        var updateDto = com.cimb.wealth.dto.UserDto.builder()
            .firstName("Updated")
            .lastName("Name")
            .riskProfile(User.RiskProfile.AGGRESSIVE)
            .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // When
        var result = userService.updateUser(userId, updateDto);

        // Then
        assertNotNull(result);
        
        verify(userRepository).findById(userId);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void deleteUser_ShouldDeactivateUser_WhenUserExists() {
        // Given
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // When
        userService.deleteUser(userId);

        // Then
        verify(userRepository).findById(userId);
        verify(userRepository).save(any(User.class));
    }
}
