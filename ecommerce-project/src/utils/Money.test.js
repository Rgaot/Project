import { expect, it, describe } from 'vitest';
import { formatCurrency } from './Money';

describe('format Currency', () => {
    it('format 1999 cents as $19.99', () => {
        expect(formatCurrency(1999)).toEqual('$19.99')
    });
    it('displays 2 decimals', () => {
        expect(formatCurrency(1090)).toBe('$10.90')
        expect(formatCurrency(100)).toEqual('$1.00')
    });
})
