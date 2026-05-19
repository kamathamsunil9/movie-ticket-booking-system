package com.ticketbooking.ticket_booking_system.auth.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ticketbooking.ticket_booking_system.auth.util.JwtUtil;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        //  CRITICAL FIX — ALLOW PREFLIGHT (OPTIONS)
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            res.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String path = req.getRequestURI();

        //  Allow public APIs
        if (path.startsWith("/auth")) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = req.getHeader("Authorization");

        //  Check Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                String email = jwtUtil.extractEmail(token);
                String role = jwtUtil.extractRole(token);

                System.out.println("User: " + email);
                System.out.println("Role: " + role);

                //  Admin restriction
                if (path.contains("/admin") && !role.equalsIgnoreCase("ADMIN")) {
                    res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    res.setContentType("text/plain");
                    res.getWriter().write("Access Denied - Admin only");
                    return;
                }

            } catch (Exception e) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.setContentType("text/plain");
                res.getWriter().write("Invalid Token");
                return;
            }

        } else {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("text/plain");
            res.getWriter().write("Missing Token");
            return;
        }

        // ✅ Continue request
        chain.doFilter(request, response);
    }
}