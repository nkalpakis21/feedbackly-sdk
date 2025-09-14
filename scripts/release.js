#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get version type from command line args
const versionType = process.argv[2] || 'patch'; // patch, minor, major

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('❌ Invalid version type. Use: patch, minor, or major');
  process.exit(1);
}

try {
  console.log(`🚀 Starting release process for ${versionType} version...`);
  
  // 1. Build package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // 2. Update version
  console.log(`📦 Updating version (${versionType})...`);
  const newVersion = execSync(`npm version ${versionType}`, { encoding: 'utf8' }).trim();
  console.log(`✅ Version updated to ${newVersion}`);
  
  // 3. Create changelog entry
  const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  const newEntry = `## [${newVersion}] - ${today}

### Added
- New features and improvements

### Changed
- Updates and modifications

### Fixed
- Bug fixes and patches

`;
  
  const updatedChangelog = changelog.replace('## [Unreleased]', newEntry + '## [Unreleased]');
  fs.writeFileSync(changelogPath, updatedChangelog);
  console.log('📝 Updated CHANGELOG.md');
  
  // 4. Commit changes
  console.log('💾 Committing changes...');
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: release ${newVersion}"`, { stdio: 'inherit' });
  
  // 5. Create and push tag
  console.log('🏷️  Creating and pushing tag...');
  execSync(`git tag -a ${newVersion} -m "Release ${newVersion}"`, { stdio: 'inherit' });
  execSync('git push origin main --tags', { stdio: 'inherit' });
  
  console.log(`🎉 Release ${newVersion} created successfully!`);
  console.log('📋 Next steps:');
  console.log('   1. GitHub Actions will automatically publish to npm');
  console.log('   2. GitHub release will be created automatically');
  console.log('   3. Check the Actions tab for progress');
  
} catch (error) {
  console.error('❌ Release failed:', error.message);
  process.exit(1);
}
