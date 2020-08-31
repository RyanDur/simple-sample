import {AddressInput, CheckBoxEvent, FormElement} from './types';
import {address} from './Address';
import './style.css'

const form: HTMLFormElement = document.querySelector('form');
const sameAsHome: HTMLInputElement = form.querySelector('#same-as-home');
const {addressInput, onUpdateAddressValue, updateAddressField} = address(form)

const updateCandidate = (element: FormElement) => {
    !!element.value ?
        element.classList.add('candidate') :
        element.classList.remove('candidate');
    return element;
};

const homeAddressInput = addressInput('home');
const workAddressInput = addressInput('work');

const addressesInputs = ['state', 'street', 'city', 'zip']
    .map((field) => ([homeAddressInput(field), workAddressInput(field)]));

addressesInputs.forEach(([home, work]) =>
    home.addEventListener('input', onUpdateAddressValue(work, sameAsHome)));

sameAsHome.addEventListener('click', ({target}: CheckBoxEvent) =>
    target.checked && addressesInputs.forEach(([left, right]: AddressInput[]) => {
        updateAddressField(left, right);
        updateCandidate(right)
    }));

const updateCandidateOnInput = (element: FormElement) => {
    element.addEventListener('input', (event: Event) => updateCandidate(event.target as FormElement));
    return element;
};

['input', 'select'].forEach((elementType) =>
    Array.from(form.querySelectorAll(elementType))
        .map(updateCandidateOnInput)
        .map(updateCandidate));
