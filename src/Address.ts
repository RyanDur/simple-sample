import {AddressElement} from "./types";

export const address = (form: HTMLFormElement) => {
    const addressInput = (addressType: string, field: string) =>
        form.querySelector(`.${addressType}.address`)
            .querySelector(`.${field}.value`);

    const updateAddressField = (left: AddressElement, right: AddressElement) =>
        right.value = left.value;

    const onUpdateAddressValue = (element: AddressElement, checkBox) => (event: Event) =>
        checkBox.checked && updateAddressField(event.target as AddressElement, element);

    return {
        addressInput,
        onUpdateAddressValue,
        updateAddressField
    }
}
