import { expect, it, describe } from 'vitest';
import { formatCurrency } from './Money';

describe('Format Currency', () => {
    it('format 1999 cents as $19.99', () => {
        expect(formatCurrency(1999)).toEqual('$19.99')
    });
    it('displays 2 decimals', () => {
        expect(formatCurrency(1090)).toBe('$10.90')
        expect(formatCurrency(100)).toEqual('$1.00')
    });
    it('format 0 cents as $0.00', () => {
        expect(formatCurrency(0)).toEqual('$0.00')
    })
    it('format negatives numbers', () => {
        expect(formatCurrency(-999)).toEqual('$-9.99')
        expect(formatCurrency(-100)).toEqual('$-1.00')
    })
})
