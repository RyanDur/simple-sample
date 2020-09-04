import {AddressElement, CheckBoxEvent, FormElement} from './types';
import {address} from './Address';
import './style.css'

const form: HTMLFormElement = document.querySelector('form');
const sameAsHome: HTMLInputElement = form.querySelector('#same-as-home');
const {addressInput, updateAddressField} = address(form)
const updateCandidate = (element: FormElement) => {
    !!element.value ? element.classList.add('candidate') : element.classList.remove('candidate');
    return element;
};
const updateCandidateOnInput = (element: FormElement) => {
    element.addEventListener('input', (event: Event) => updateCandidate(event.target as FormElement));
    return element;
};
const addressesInputs = ['state', 'street', 'city', 'zip'].map((field) =>
    ([addressInput('home', field), addressInput('work', field)]));

const update = (work: AddressElement, home: AddressElement) => {
    work.value = home.value;
    updateCandidate(work);
};

addressesInputs.forEach(([home, work]: AddressElement[]) =>
    home.addEventListener('input', () => sameAsHome.checked && update(work, home)));

sameAsHome.addEventListener('click', ({target}: CheckBoxEvent) => {
    target.checked && addressesInputs.forEach(([home, work]: AddressElement[]) => update(work, home));
});

['input', 'select'].forEach((elementType) =>
    Array.from<FormElement>(form.querySelectorAll(elementType))
        .map(updateCandidateOnInput)
        .map(updateCandidate));
