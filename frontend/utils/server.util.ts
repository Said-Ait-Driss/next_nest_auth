import 'server-only';

// this func should run only on the server
export function serverUtilFunction(): string {
    console.log('server util function ');

    return 'server util function ...';
}
