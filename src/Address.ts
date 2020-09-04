import {AddressElement} from "./types";

export const address = (form: HTMLFormElement) => {
    const addressSection = (addressType: string) => (field: string): AddressElement =>
        form.querySelector(`.${addressType}.address`)
            .querySelector(`.${field}.value`);

    return {
        addressSection
    }
}
