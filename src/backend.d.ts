import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    subject: string;
    email: string;
    message: string;
    timestamp: Time;
    lastName: string;
    firstName: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<[Principal, Array<ContactFormSubmission>]>>;
    submitContactForm(firstName: string, lastName: string, email: string, subject: string, message: string): Promise<void>;
}
