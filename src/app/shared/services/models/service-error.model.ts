export type ServiceErrorCode =
  'cancelled' |
  'unknown' |
  'invalid-argument' |
  'deadline-exceeded' |
  'not-found' |
  'already-exists' |
  'permission-denied' |
  'resource-exhausted' |
  'failed-precondition' |
  'aborted' |
  'out-of-range' |
  'unimplemented' |
  'internal' |
  'unavailable' |
  'data-loss' |
  'unauthenticated';

export class ServiceError {
  constructor(
    public code: ServiceErrorCode = 'unknown',
    public name: string = 'unknown',
    public message: string = 'unknown',
    public stack: string = ''
  ) {
  }

  public isAccessDenied(): boolean {
    return ['not-found', 'permission-denied'].includes(this.code);
  }
}
