import {AddressElement, CheckBoxEvent, FormElement} from './types';
import {address} from './Address';
import './style.css'

const form: HTMLFormElement = document.querySelector('form');
const sameAsHome: HTMLInputElement = form.querySelector('#same-as-home');
const {addressSection} = address(form)
const updateCandidate = (element: FormElement): FormElement => {
    !!element.value ? element.classList.add('candidate') : element.classList.remove('candidate');
    return element;
};
const updateCandidateOnInput = (element: FormElement): FormElement => {
    element.addEventListener('input', (event: Event) => updateCandidate(event.target as FormElement));
    return element;
};
const home = addressSection('home');
const work = addressSection('work');
const addressesElements = ['state', 'street', 'city', 'zip'].map((field) => ([home(field), work(field)]));
const updateAddress = (work: AddressElement, home: AddressElement) => {
    work.value = home.value;
    updateCandidate(work);
};

addressesElements.forEach(([home, work]: AddressElement[]) =>
    home.addEventListener('input', ({target}) =>
        sameAsHome.checked && updateAddress(work, target as AddressElement)));

sameAsHome.addEventListener('click', ({target}: CheckBoxEvent) =>
    addressesElements.forEach(([home, work]: AddressElement[]) => {
        if (target.checked) {
            updateAddress(work, home);
            (work as HTMLInputElement).readOnly = true
        } else (work as HTMLInputElement).readOnly = false;
    }));

['input', 'select'].forEach((elementType) =>
    Array.from<FormElement>(form.querySelectorAll(elementType))
        .map(updateCandidateOnInput)
        .map(updateCandidate));
