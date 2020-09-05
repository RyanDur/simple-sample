import {AddressElement, CheckBoxEvent, FormElement} from './types';
import './style.css'

const form: HTMLFormElement = document.querySelector('form');
const sameAsHome: HTMLInputElement = form.querySelector('#same-as-home');
const addressType = (addressType: string) => (field: string): AddressElement =>
    form.querySelector(`.${addressType}.address .${field}.value`);

const updateCandidate = (element: FormElement): FormElement => {
    !!element.value ? element.classList.add('candidate') : element.classList.remove('candidate');
    return element;
};
const updateCandidateOnInput = (element: FormElement): FormElement => {
    element.addEventListener('input', (event: Event) => updateCandidate(event.target as FormElement));
    return element;
};
const home = addressType('home');
const work = addressType('work');
const addressesElements = ['state', 'street', 'city', 'zip'].map((field) => ([home(field), work(field)]));
const updateAddress = (work: AddressElement, home: AddressElement) => {
    work.value = home.value;
    updateCandidate(work);
};
const setReadOnly = (work: AddressElement, isReadOnly: boolean) => {
    if (work instanceof HTMLInputElement)
        (work as HTMLInputElement).readOnly = isReadOnly
    else work.disabled = isReadOnly
};

addressesElements.forEach(([home, work]: AddressElement[]) =>
    home.addEventListener('input', ({target}) =>
        sameAsHome.checked && updateAddress(work, target as AddressElement)));

sameAsHome.addEventListener('click', ({target}: CheckBoxEvent) =>
    addressesElements.forEach(([home, work]: AddressElement[]) => {
        if (target.checked) {
            updateAddress(work, home);
            setReadOnly(work, true);
        } else setReadOnly(work, false);
    }));

['input', 'select'].forEach((elementType) =>
    Array.from<FormElement>(form.querySelectorAll(elementType))
        .map(updateCandidateOnInput)
        .map(updateCandidate));
