#!/bin/bash

echo "Running Delaware DSA Website Test Suite"
echo "======================================="

# Run unit tests
echo "Running unit tests..."
npm test -- --coverage

# Run linting
echo "Running linting..."
npm run lint

# Run type checking
echo "Running type checking..."
npm run type-check

# Run accessibility tests
echo "Running accessibility tests..."
npm test -- --testPathPattern="a11y"

# Run integration tests
echo "Running integration tests..."
npm test -- --testPathPattern="integration"

# Generate coverage report
echo "Generating coverage report..."
npm test -- --coverage --coverageReporters=html

echo "Test suite complete!"
