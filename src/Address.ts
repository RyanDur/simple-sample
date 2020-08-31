import {AddressInput} from "./types";

export const address = (form: HTMLFormElement) => {
    const addressInput = (addressType: string) => (field: string) =>
        form.querySelector(`.${addressType}.address`)
            .querySelector(`.${field}.value`);

    const updateAddressField = (left: AddressInput, right: AddressInput) =>
        right.value = left.value;

    const onUpdateAddressValue = (element, checkBox) => (event: Event) =>
        checkBox.checked && updateAddressField(event.target as AddressInput, element);

    return {
        addressInput,
        onUpdateAddressValue,
        updateAddressField
    }
}
