import { AddressElement, FormElement } from './types';
import './index.css';

const form: HTMLFormElement = document.querySelector('form');
const sameAsHome: HTMLInputElement = form.querySelector('#same-as-home');
const address = (addressType: string) => (field: string): AddressElement =>
  form.querySelector(`.${addressType}.address .${field}.value`);

const updateCandidate = (element: FormElement): FormElement => {
  element.value
    ? element.classList.add('candidate')
    : element.classList.remove('candidate');
  return element;
};
const updateCandidateOnInput = (element: FormElement): FormElement => {
  element.addEventListener('input', (event: Event) =>
    updateCandidate(event.target as FormElement)
  );
  return element;
};
const home = address('home');
const work = address('work');
const addressesElements = ['state', 'street', 'city', 'zip'].map((field) => [
  home(field),
  work(field)
]);
const updateAddress = (work: AddressElement, home: AddressElement) => {
  work.value = home.value;
  updateCandidate(work);
};
const setReadOnly = (addressElement: AddressElement, isReadOnly: boolean) => {
  if (addressElement instanceof HTMLSelectElement)
    addressElement.disabled = isReadOnly;
  else (addressElement as HTMLInputElement).readOnly = isReadOnly;
};

addressesElements.forEach(([home, work]: AddressElement[]) =>
  home.addEventListener(
    'input',
    ({ target }) =>
      sameAsHome.checked && updateAddress(work, target as AddressElement)
  )
);

sameAsHome.addEventListener('click', ({ target }: MouseEvent) => {
  const checkbox = target as HTMLInputElement;
  addressesElements.forEach(([home, work]: AddressElement[]) => {
    if (checkbox.checked) {
      updateAddress(work, home);
      setReadOnly(work, true);
    } else setReadOnly(work, false);
  });
});

['input', 'select'].forEach((elementType) =>
  Array.from<FormElement>(form.querySelectorAll(elementType))
    .map(updateCandidateOnInput)
    .map(updateCandidate)
);
