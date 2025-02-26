'use strict';

const initApp = () => {
  const result = document.getElementById('result');
  const copyBtn = document.getElementById('copy');
  const generateBtn = document.getElementById('generate');
  const lengthEl = document.getElementById('length');
  const uppercase = document.getElementById('uppercase');
  const lowercase = document.getElementById('lowercase');
  const numbers = document.getElementById('numbers');
  const symbols = document.getElementById('symbols');

  const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*(){}[]=<>/,.',
  };

  const getRandomChar = (str) => {
    return str.charAt(Math.floor(Math.random() * str.length));
  };

  const generatePassword = () => {
    const length = +lengthEl.value;
    result.classList.remove('text-danger');

    if (length < 4 || length > 20) {
      result.value = 'Length must be between 4 and 20';
      result.classList.add('text-danger');
      return;
    }

    const selectedSets = [];

    if (uppercase.checked) selectedSets.push(characterSets.uppercase);
    if (lowercase.checked) selectedSets.push(characterSets.lowercase);
    if (numbers.checked) selectedSets.push(characterSets.numbers);
    if (symbols.checked) selectedSets.push(characterSets.symbols);

    if (selectedSets.length === 0) {
      result.value = 'Select at least one option';
      result.classList.add('text-danger');
      return;
    }

    let password = '';

    for (let i = 0; i < length; i++) {
      const randomSet =
        selectedSets[Math.floor(Math.random() * selectedSets.length)];

      password += getRandomChar(randomSet);
    }

    result.value = password;
  };

  const copyPassword = () => {
    const password = result.value;

    if (
      !password ||
      password === 'Select at least one option' ||
      password === 'Length must be between 4 and 20'
    ) {
      return;
    }

    navigator.clipboard
      .writeText(password)
      .then(() => {
        result.value = 'Copied!';
        result.classList.add('text-success');

        setTimeout(() => {
          result.classList.remove('text-success');
          result.value = password;
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  copyBtn.addEventListener('click', copyPassword);
  generateBtn.addEventListener('click', generatePassword);
};

document.addEventListener('DOMContentLoaded', initApp);
