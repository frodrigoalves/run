

import * as fs from 'fs';
import * as path from 'path';

describe('CHANGELOG.md', () => {
  let changelogContent: string;

  beforeAll(() => {
    try {
      changelogContent = fs.readFileSync(path.join(__dirname, '../CHANGELOG.md'), 'utf-8');
    } catch (error) {
      changelogContent = '';
    }
  });

  test('should exist and not be empty', () => {
    expect(changelogContent).not.toBe('');
  });

  test('should have a level 2 header for each version with a date in YYYY-MM-DD format', () => {
    const versionHeaders = changelogContent.match(/^## \d+\.\d+\.\d+ - \d{4}-\d{2}-\d{2}$/gm);
    expect(versionHeaders).not.toBeNull();
    if (versionHeaders) {
      expect(versionHeaders.length).toBeGreaterThan(0);
    }
  });

  test('each version should have at least one change listed', () => {
    const versions = changelogContent.split(/^## /m).slice(1);
    versions.forEach(version => {
      const changes = version.split('\n').slice(1).filter(line => line.trim() !== '' && !line.startsWith('##'));
      expect(changes.length).toBeGreaterThan(0);
    });
  });

  test('each change should start with a valid type (e.g., feat:, fix:, docs:, etc.)', () => {
    const versions = changelogContent.split(/^## /m).slice(1);
    versions.forEach(version => {
      const changes = version.split('\n').slice(1).filter(line => line.trim() !== '' && !line.startsWith('##'));
      changes.forEach(change => {
        expect(change.trim().match(/^(feat|fix|docs|style|refactor|perf|test|chore):/)).not.toBeNull();
      });
    });
  });
});
