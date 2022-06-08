export function hexToRgb(hex: string): number[] {
    return hex
        .slice(1)
        .padStart(6, 'f')
        .match(/^(..)(..)(..)$/)!
        .slice(1, 4)
        .map(s => parseInt(s, 16));
}

function isStringEnum<T extends Record<string, string | number>>(t: T): boolean {
    return typeof Object.values(t).pop() === 'string';
}

export function enumKeys<T extends Record<string, string | number>>(t: T): (keyof T)[] {
    return isStringEnum(t) ? Object.keys(t) : Object.keys(t).slice(0, Object.keys(t).length / 2);
}

export function enumValues<T extends Record<string, string>>(t: T): string[];
export function enumValues<T extends Record<string, string | number>>(t: T): number[];
export function enumValues<T extends Record<string, string | number>>(t: T): string[] | number[] {
    if (isStringEnum(t)) {
        return Object.values(t) as string[];
    } else {
        return Object.values(t).slice(Object.values(t).length / 2) as number[];
    }
}

export function capitalize(str: string) {
    return str.replace(/^\w/, c => c.toLocaleLowerCase());
}

export function stringToColor(string: string | undefined): string {
    if (!string) {
        return 'default';
    }

    let hash = 3;
    let color = '#';

    /* eslint-disable no-bitwise */
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

/**
 * Simple email check, checks only for a character before the @ symbol
 * and something before and after the dot in the domain part, space is not allowed.
 * @return True if the email is valid or blank, false otherwise
 */
export function isEmailAddress(input: string): boolean {
    if (input === null) {
        return false;
    }
    if (input.length === 0) {
        return true;
    }
    return /^\S+@\S+\.\S+$/.test(input);
}

export const doesImageExist = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();

        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};
