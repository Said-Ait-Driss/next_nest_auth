import 'client-only';

export function clientOnlyFunction(): string {
    console.log('access to localstorage');
    return 'client result';
}
