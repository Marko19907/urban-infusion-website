export function hexToRgb(hex: string): number[] {
    return hex
        .slice(1)
        .padStart(6, 'f')
        .match(/^(..)(..)(..)$/)!
        .slice(1, 4)
        .map(s => parseInt(s, 16));
}
