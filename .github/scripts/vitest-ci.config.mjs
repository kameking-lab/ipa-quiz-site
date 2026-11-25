import { mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config.ts';
import CISequencer from './unit-sequencer.mjs';

export default mergeConfig(baseConfig, {
  test: { sequence: { sequencer: CISequencer } },
});
