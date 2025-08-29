#!/usr/bin/env bash

# A simple test script for the .idx/dev.nix file.
# This script checks for basic syntax correctness of the Nix expression.

echo "Running tests for .idx/dev.nix..."

# Test 1: Check if the Nix file is syntactically correct.
# `nix-instantiate` will throw an error if the file is not a valid Nix expression.
if nix-instantiate --eval --strict .idx/dev.nix &> /dev/null; then
  echo "✅ PASSED: .idx/dev.nix is syntactically correct."
else
  echo "❌ FAILED: .idx/dev.nix has a syntax error."
  # Optionally, print the error from nix-instantiate for debugging
  nix-instantiate --eval --strict .idx/dev.nix
  exit 1
fi

echo "All tests passed!"
exit 0
