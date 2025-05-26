import 'colors';

export const logSuccess = (msg: string, ...optionalParams: any[]) => console.log(`[SUCCESS] ${msg}`.green+( optionalParams.length > 0? ("\n" + optionalParams) : ''));
export const logError = (msg: string, ...optionalParams: any[]) => console.error(`[ERROR] ${msg}`.bgRed + (optionalParams.length > 0 ? ("\n" + optionalParams) : ''));
export const logWarning = (msg: string, ...optionalParams: any[]) => console.warn(`[WARNING] ${msg}`.yellow + (optionalParams.length > 0 ? ("\n" + optionalParams) : ''));
export const logInfo = (msg: string, ...optionalParams: any[]) => console.warn(`[WARNING] ${msg}`.bgCyan + (optionalParams.length > 0 ? ("\n" + optionalParams) : ''));
