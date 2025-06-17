import { Dispatch, SetStateAction } from 'react';

export const setModalElement = (
  modalId: string,
  setContainer: Dispatch<SetStateAction<Element | null>>,
): (() => void) => {
  const newContainer = document.createElement('div');
  newContainer.setAttribute('id', modalId);
  document.body.appendChild(newContainer);

  setContainer(newContainer);

  return () => {
    const containerDOM = document.getElementById(modalId) as HTMLDivElement;
    containerDOM.remove();
  };
};
