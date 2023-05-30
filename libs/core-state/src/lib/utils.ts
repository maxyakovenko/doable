export function guid(): string {
    return Math.random()
        .toString(36)
        .slice(2);
}