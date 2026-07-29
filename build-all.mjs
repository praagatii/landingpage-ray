import { execSync } from 'child_process';

console.log('Building desktop...');
execSync('npx vite build', { stdio: 'inherit' });

console.log('Building mobile...');
execSync('npx vite build --config vite.mobile.config.js', { stdio: 'inherit' });

console.log('Done — desktop at dist/index.html, mobile at dist/mobile.html');
