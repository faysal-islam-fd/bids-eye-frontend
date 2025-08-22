#!/usr/bin/env node

/**
 * Performance Testing Script for Birds Eye Fashion
 * 
 * This script helps test the performance improvements after implementing SSR.
 * Run this after deploying your application to compare performance metrics.
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';
const TEST_PAGES = [
  '/',
  '/shop',
  '/collections',
  '/contact',
  '/product/sample-product', // Replace with actual product slug
  '/shop/sample-category', // Replace with actual category slug
];

// Performance metrics to track
const metrics = {
  totalTests: 0,
  passedTests: 0,
  results: []
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        resolve({
          url,
          statusCode: res.statusCode,
          responseTime,
          contentLength: data.length,
          headers: res.headers,
          hasSSRContent: data.includes('<!DOCTYPE html>') && data.includes('<body>'),
          hasMetaTags: data.includes('<meta name="description"'),
          hasOpenGraph: data.includes('property="og:'),
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testPage(path) {
  const fullUrl = `${BASE_URL}${path}`;
  
  try {
    console.log(`Testing: ${fullUrl}`);
    const result = await makeRequest(fullUrl);
    
    metrics.totalTests++;
    
    // Evaluate performance criteria
    const tests = {
      statusOk: result.statusCode === 200,
      fastResponse: result.responseTime < 2000, // Under 2 seconds
      hasContent: result.contentLength > 1000,
      hasSSR: result.hasSSRContent,
      hasSEO: result.hasMetaTags,
      hasOG: result.hasOpenGraph,
    };
    
    const passed = Object.values(tests).every(Boolean);
    if (passed) metrics.passedTests++;
    
    const testResult = {
      path,
      ...result,
      tests,
      passed,
      score: Object.values(tests).filter(Boolean).length / Object.values(tests).length * 100
    };
    
    metrics.results.push(testResult);
    
    // Display results
    console.log(`✅ Status: ${result.statusCode}`);
    console.log(`⏱️  Response Time: ${result.responseTime}ms`);
    console.log(`📄 Content Length: ${result.contentLength} bytes`);
    console.log(`🚀 SSR Content: ${tests.hasSSR ? '✅' : '❌'}`);
    console.log(`🔍 SEO Meta Tags: ${tests.hasSEO ? '✅' : '❌'}`);
    console.log(`📱 Open Graph: ${tests.hasOG ? '✅' : '❌'}`);
    console.log(`📊 Score: ${testResult.score.toFixed(1)}%`);
    console.log('---');
    
    return testResult;
  } catch (error) {
    console.error(`❌ Error testing ${fullUrl}:`, error.message);
    metrics.totalTests++;
    return { path, error: error.message, passed: false, score: 0 };
  }
}

async function runPerformanceTests() {
  console.log('🚀 Starting Performance Tests for Birds Eye Fashion');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log('===============================================\n');
  
  const startTime = Date.now();
  
  for (const path of TEST_PAGES) {
    await testPage(path);
    // Add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  
  // Generate summary report
  console.log('\n📊 PERFORMANCE TEST SUMMARY');
  console.log('===============================================');
  console.log(`Total Tests: ${metrics.totalTests}`);
  console.log(`Passed Tests: ${metrics.passedTests}`);
  console.log(`Success Rate: ${(metrics.passedTests / metrics.totalTests * 100).toFixed(1)}%`);
  console.log(`Total Time: ${totalTime}ms`);
  console.log(`Average Response Time: ${(metrics.results.reduce((sum, r) => sum + (r.responseTime || 0), 0) / metrics.results.length).toFixed(0)}ms`);
  
  // Performance recommendations
  console.log('\n💡 RECOMMENDATIONS');
  console.log('===============================================');
  
  const slowPages = metrics.results.filter(r => r.responseTime > 1000);
  if (slowPages.length > 0) {
    console.log('⚠️  Slow pages (>1s):');
    slowPages.forEach(page => {
      console.log(`   - ${page.path}: ${page.responseTime}ms`);
    });
  }
  
  const noSSRPages = metrics.results.filter(r => !r.tests?.hasSSR);
  if (noSSRPages.length > 0) {
    console.log('⚠️  Pages without SSR:');
    noSSRPages.forEach(page => {
      console.log(`   - ${page.path}`);
    });
  }
  
  const noSEOPages = metrics.results.filter(r => !r.tests?.hasSEO);
  if (noSEOPages.length > 0) {
    console.log('⚠️  Pages without SEO meta tags:');
    noSEOPages.forEach(page => {
      console.log(`   - ${page.path}`);
    });
  }
  
  if (metrics.passedTests === metrics.totalTests) {
    console.log('\n🎉 All tests passed! Your SSR implementation is working great!');
  } else {
    console.log(`\n⚠️  ${metrics.totalTests - metrics.passedTests} tests failed. Check the issues above.`);
  }
  
  // Save detailed results
  const fs = require('fs');
  const reportPath = './performance-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(metrics, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

// Run the tests
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

module.exports = { runPerformanceTests, testPage };
