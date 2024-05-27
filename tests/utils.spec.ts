import { describe, it, expect } from 'vitest';
import { formatToBRL } from '../src/utils';

describe('formatToBRL Function', () => {
  it('should format number to BRL currency', () => {
    const result = formatToBRL(1234.56);
    expect(result).toBe('1.234,56');
  });

  it('should format small number to BRL currency', () => {
    const result = formatToBRL(0.99);
    expect(result).toBe('0,99');
  });

  it('should format large number to BRL currency', () => {
    const result = formatToBRL(1000000);
    expect(result).toBe('1.000.000,00');
  });

  it('should handle zero correctly', () => {
    const result = formatToBRL(0);
    expect(result).toBe('0,00');
  });

  it('should handle negative numbers', () => {
    const result = formatToBRL(-1234.56);
    expect(result).toBe('-1.234,56');
  });
});
