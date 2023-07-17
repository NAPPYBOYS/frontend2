export function snakeToHumanReadable(str: string): string {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

export function convertSnakeToHumanReadable(strings: string[]): string[] {
    const result: string[] = [];

    for (const str of strings) {
        result.push(snakeToHumanReadable(str));
    }

    return result;
}

export function mapSnakeToHumanReadable(strings: string[]): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    for (const str of strings) {
        result[str] = snakeToHumanReadable(str);
    }

    return result;
}

