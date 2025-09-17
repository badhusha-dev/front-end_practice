package com.cimb.wealth.service;

import com.cimb.wealth.domain.User;
import com.cimb.wealth.dto.AuthResponseDto;
import com.cimb.wealth.dto.UserDto;
import com.cimb.wealth.repository.UserRepository;
import com.cimb.wealth.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponseDto login(String email, String password) {
        log.info("Attempting login for user: {}", email);
        
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        
        String token = jwtTokenProvider.generateToken(authentication);
        String refreshToken = jwtTokenProvider.generateRefreshToken(email);
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        return AuthResponseDto.builder()
            .token(token)
            .refreshToken(refreshToken)
            .user(mapToDto(user))
            .build();
    }

    public AuthResponseDto refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        
        String email = jwtTokenProvider.getUsernameFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        String newToken = jwtTokenProvider.generateTokenFromUsername(email);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(email);
        
        return AuthResponseDto.builder()
            .token(newToken)
            .refreshToken(newRefreshToken)
            .user(mapToDto(user))
            .build();
    }

    public UserDto createUser(UserDto userDto) {
        log.info("Creating new user: {}", userDto.getEmail());
        
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("User with email already exists");
        }
        
        User user = User.builder()
            .email(userDto.getEmail())
            .password(passwordEncoder.encode(userDto.getPassword()))
            .firstName(userDto.getFirstName())
            .lastName(userDto.getLastName())
            .phoneNumber(userDto.getPhoneNumber())
            .role(userDto.getRole())
            .riskProfile(userDto.getRiskProfile())
            .active(true)
            .build();
        
        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        log.info("Updating user: {}", id);
        
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }
        if (userDto.getLastName() != null) {
            user.setLastName(userDto.getLastName());
        }
        if (userDto.getPhoneNumber() != null) {
            user.setPhoneNumber(userDto.getPhoneNumber());
        }
        if (userDto.getRiskProfile() != null) {
            user.setRiskProfile(userDto.getRiskProfile());
        }
        if (userDto.getActive() != null) {
            user.setActive(userDto.getActive());
        }
        
        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    public void deleteUser(Long id) {
        log.info("Deleting user: {}", id);
        
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setActive(false);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToDto(user);
    }

    @Transactional(readOnly = true)
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return mapToDto(user);
    }

    @Transactional(readOnly = true)
    public Page<UserDto> getAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAllActive(pageable);
        return users.map(this::mapToDto);
    }

    @Transactional(readOnly = true)
    public List<UserDto> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role, Pageable.unpaged())
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
            .id(user.getId())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .phoneNumber(user.getPhoneNumber())
            .role(user.getRole())
            .riskProfile(user.getRiskProfile())
            .active(user.getActive())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .build();
    }
}
