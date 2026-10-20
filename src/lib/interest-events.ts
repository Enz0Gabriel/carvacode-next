import type { Interest } from './contact';

// Comunicação leve entre os links "Conversar sobre..." dos cards e o formulário,
// sem estado global: o link continua sendo uma âncora comum para #contact.
export const INTEREST_EVENT = 'carvacode:select-interest';

export function selectInterest(interest: Interest) {
  window.dispatchEvent(new CustomEvent<Interest>(INTEREST_EVENT, { detail: interest }));
}
