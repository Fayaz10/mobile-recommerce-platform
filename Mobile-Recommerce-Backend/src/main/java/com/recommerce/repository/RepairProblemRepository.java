package com.recommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.RepairProblem;

public interface RepairProblemRepository extends JpaRepository<RepairProblem, Long> {

    // Customer - Get repair problems for a specific model
    List<RepairProblem> findByModelIdAndActiveTrue(Long modelId);

    // Customer - Get all active repair problems
    List<RepairProblem> findByActiveTrue();

    // Admin - Search by problem name
    List<RepairProblem> findByProblemNameContainingIgnoreCase(String problemName);

    // Admin - Filter by category
    List<RepairProblem> findByCategory(String category);

    // Admin - Show in display order
    List<RepairProblem> findAllByOrderByDisplayOrderAsc();
}