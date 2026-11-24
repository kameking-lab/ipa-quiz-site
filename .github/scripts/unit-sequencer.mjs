import { relative } from 'node:path';
import { BaseSequencer } from 'vitest/node';

// Test-body seconds for the slowest files on PR #845 (run 45408824555).
// Other files use a common estimate that includes loading and setup.
const slowSeconds = new Map([
  ['__tests__/questions/sharoushi-kangoshi-routes.test.ts', 660],
  ['__tests__/questions/ipa-paper-player-parity.test.ts', 76],
  ['__tests__/copilot/rag-pipeline.test.ts', 46],
  ['__tests__/copilot/rag.test.ts', 44],
  ['__tests__/questions/lab75-local-release.test.tsx', 38],
  ['__tests__/mobile/asset-inventory.test.ts', 36],
  ['__tests__/copilot/ip-choice-rag-regression.test.ts', 35],
  ['__tests__/native580-entrypoints.test.tsx', 31],
  ['__tests__/seo/adk-collection-indexing.test.ts', 28],
  ['__tests__/mobile/catalog-parity.test.ts', 26],
  ['__tests__/copilot/related-header.test.ts', 26],
]);

export default class CISequencer extends BaseSequencer {
  file(spec) {
    return relative(this.ctx.config.root, spec.moduleId).replaceAll('\\', '/');
  }

  async shard(specs) {
    const { count, index } = this.ctx.config.shard;
    const shards = Array.from({ length: count }, () => ({ seconds: 0, specs: [] }));
    const timed = specs.map(spec => {
      const file = this.file(spec);
      return { spec, file, seconds: 5 + (slowSeconds.get(file) ?? 0) };
    });
    timed.sort((a, b) => b.seconds - a.seconds || a.file.localeCompare(b.file, 'en'));
    for (const { spec, seconds } of timed) {
      const shard = shards.reduce((least, next) => next.seconds < least.seconds ? next : least);
      shard.specs.push(spec);
      shard.seconds += seconds;
    }
    return shards[index - 1].specs;
  }

  async sort(specs) {
    const sorted = await super.sort(specs);
    // Start the longest files promptly so their runtime overlaps other files.
    return sorted.sort((a, b) => (slowSeconds.get(this.file(b)) ?? 0) - (slowSeconds.get(this.file(a)) ?? 0));
  }
}
