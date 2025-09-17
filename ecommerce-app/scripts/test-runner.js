#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running Comprehensive Test Suite...\n');

// Test configuration
const testConfig = {
  unit: {
    command: 'npm run test:unit',
    description: 'Unit Tests',
    pattern: '**/*.test.{js,jsx}'
  },
  integration: {
    command: 'npm run test:integration',
    description: 'Integration Tests',
    pattern: '**/*.integration.test.{js,jsx}'
  },
  coverage: {
    command: 'npm run test:coverage',
    description: 'Coverage Report',
    pattern: '**/*.{js,jsx}'
  },
  e2e: {
    command: 'npm run test:e2e',
    description: 'End-to-End Tests',
    pattern: '**/*.e2e.test.{js,jsx}'
  }
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runTest(testType) {
  const config = testConfig[testType];
  if (!config) {
    log(`❌ Unknown test type: ${testType}`, 'red');
    return false;
  }

  log(`\n${colors.bold}Running ${config.description}...`, 'blue');
  
  try {
    execSync(config.command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    log(`✅ ${config.description} passed!`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${config.description} failed!`, 'red');
    return false;
  }
}

function checkTestFiles() {
  log('\n📁 Checking test files...', 'blue');
  
  const testDirs = [
    'src/features',
    'src/components',
    'src/__tests__'
  ];
  
  let totalTests = 0;
  let missingTests = [];
  
  testDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = getAllFiles(dir);
      const testFiles = files.filter(file => 
        file.endsWith('.test.js') || 
        file.endsWith('.test.jsx') ||
        file.endsWith('.spec.js') ||
        file.endsWith('.spec.jsx')
      );
      
      const sourceFiles = files.filter(file => 
        (file.endsWith('.js') || file.endsWith('.jsx')) &&
        !file.includes('.test.') &&
        !file.includes('.spec.') &&
        !file.includes('node_modules')
      );
      
      totalTests += testFiles.length;
      
      // Check for missing tests
      sourceFiles.forEach(sourceFile => {
        const testFile = sourceFile.replace(/\.(js|jsx)$/, '.test.$1');
        if (!testFiles.includes(testFile)) {
          missingTests.push(sourceFile);
        }
      });
    }
  });
  
  log(`📊 Found ${totalTests} test files`, 'green');
  
  if (missingTests.length > 0) {
    log(`⚠️  Missing tests for ${missingTests.length} files:`, 'yellow');
    missingTests.slice(0, 10).forEach(file => {
      log(`   - ${file}`, 'yellow');
    });
    if (missingTests.length > 10) {
      log(`   ... and ${missingTests.length - 10} more`, 'yellow');
    }
  }
  
  return { totalTests, missingTests: missingTests.length };
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function generateTestReport(results) {
  log('\n📋 Test Report Summary:', 'bold');
  log('='.repeat(50), 'blue');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  log(`Total Test Suites: ${total}`, 'blue');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${total - passed}`, total - passed > 0 ? 'red' : 'green');
  log(`Success Rate: ${Math.round((passed / total) * 100)}%`, 
      passed === total ? 'green' : 'yellow');
  
  if (total - passed > 0) {
    log('\n❌ Failed Test Suites:', 'red');
    results.filter(r => !r.passed).forEach(result => {
      log(`   - ${result.name}`, 'red');
    });
  }
  
  log('\n🎯 Recommendations:', 'blue');
  if (passed === total) {
    log('   ✅ All tests passed! Great job!', 'green');
    log('   📈 Consider adding more edge case tests', 'blue');
    log('   🔍 Add performance tests for critical features', 'blue');
  } else {
    log('   🔧 Fix failing tests before deployment', 'yellow');
    log('   📝 Add missing test coverage', 'yellow');
    log('   🐛 Investigate and fix any runtime issues', 'yellow');
  }
}

// Main execution
async function main() {
  log('🚀 Starting Comprehensive Test Suite', 'bold');
  log('=====================================', 'blue');
  
  // Check test files
  const { totalTests, missingTests } = checkTestFiles();
  
  // Run different types of tests
  const testTypes = ['unit', 'integration', 'coverage'];
  const results = [];
  
  for (const testType of testTypes) {
    const passed = runTest(testType);
    results.push({
      name: testConfig[testType].description,
      passed
    });
  }
  
  // Generate report
  generateTestReport(results);
  
  // Final status
  const allPassed = results.every(r => r.passed);
  if (allPassed) {
    log('\n🎉 All tests passed! App is ready for deployment!', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Some tests failed. Please fix issues before deployment.', 'red');
    process.exit(1);
  }
}

// Handle errors
process.on('uncaughtException', (error) => {
  log(`\n💥 Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`\n💥 Unhandled rejection: ${reason}`, 'red');
  process.exit(1);
});

// Run the test suite
main().catch(error => {
  log(`\n💥 Test suite failed: ${error.message}`, 'red');
  process.exit(1);
});
