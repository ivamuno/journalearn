import { ServiceError } from "..";
import { FirestoreError } from "./firestore-error";

export class FirestoreServiceHelper {
  public static convertFirestoreError2ServiceError(error: FirestoreError): ServiceError {
    return new ServiceError(error.code, error.name, error.message, error.stack);
  }
}
