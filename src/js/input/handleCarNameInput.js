import { ERR_MESSAGE } from '../utils/constant.js';
import { isValidLength, isNotBlank } from '../utils/isValidCarName.js';
import { toggleVisibility as setVisible } from '../utils/toggleVisibility.js';

export const handleCarNameInput = () => {
  const $carNameInput = document.querySelector('#car-name-input');
  const carNames = $carNameInput.value.split(',').map((car) => car.trim());

  if (!isValidCarName(carNames)) {
    return ($carNameInput.value = '');
  }
  setVisible('$racingCountSection');
  insertCarHTML(carNames);
};

const isValidCarName = (carNames) => {
  if (!carNames.every((carName) => isValidLength(carName))) {
    alert(ERR_MESSAGE.NAME_TOO_LONG);
    return false;
  }
  if (!carNames.every((carName) => isNotBlank(carName))) {
    alert(ERR_MESSAGE.NAME_CANNOT_BE_BLANK);
    return false;
  }
  return true;
};

const insertCarHTML = (carNames) => {
  const $gameProcessScreen = document.querySelector('#game-process-screen');

  $gameProcessScreen.innerHTML = carNames
    .map((carName) => carTemplate(carName))
    .join('');
};

const carTemplate = (carName) => {
  return `<div class="car" data-name=${carName}>
            <div class="car-player mr-2" data-forward-count="0">${carName}</div>
          </div>`;
};
