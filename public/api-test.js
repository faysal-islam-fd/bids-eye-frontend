// Simple API test script
(function() {
  const apiBaseUrl = 'https://api.birdseyefashion.com/api';
  const endpoints = [
    '/products/featured-products',
    '/categories/with-subcategories',
    '/collections/view-with-products'
  ];
  
  const resultDiv = document.createElement('div');
  resultDiv.style.cssText = 'position:fixed; top:0; left:0; right:0; padding:20px; background:rgba(255,255,255,0.9); z-index:9999; color:#333; overflow:auto; max-height:80vh; font-family:monospace;';
  document.body.appendChild(resultDiv);
  
  const log = (message, isError = false) => {
    const p = document.createElement('p');
    p.style.margin = '5px 0';
    p.style.padding = '5px';
    p.style.borderLeft = `4px solid ${isError ? '#f44336' : '#4caf50'}`;
    p.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
    p.textContent = message;
    resultDiv.appendChild(p);
  };

  const testEndpoint = async (endpoint) => {
    try {
      log(`Testing: ${endpoint}...`);
      const response = await fetch(`${apiBaseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      log(`✅ ${endpoint}: Success!`);
      return true;
    } catch (error) {
      log(`❌ ${endpoint}: ${error.message}`, true);
      return false;
    }
  };

  const runTests = async () => {
    log('🔍 API Connection Test');
    let successCount = 0;
    
    for (const endpoint of endpoints) {
      const success = await testEndpoint(endpoint);
      if (success) successCount++;
    }
    
    log(`✨ Tests completed: ${successCount}/${endpoints.length} endpoints working`);
    
    // Check for client-side routing issues
    log('📍 Testing client-side navigation...');
    if (!window.history || !window.history.pushState) {
      log('❌ Browser does not support HTML5 History API', true);
    } else {
      log('✅ HTML5 History API supported');
    }
  };

  // Run tests
  runTests();
})();

