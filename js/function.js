
// Функция для проверки длины строки
const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
}

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true

// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true

// Строка длиннее 20 символов
checkStringLength('проверяемая строка', 10); // false


// Функция для проверки, является ли строка палиндромом
function checkPalindrom (string) {
  const newString = string.replaceAll().toLowerCase();
  let clearString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    clearString += newString.at(i);
  }
  return newString === clearString;
}

// Строка является палиндромом
checkPalindrom('топот'); // true

// Несмотря на разный регистр, тоже палиндром
checkPalindrom('ДовОд'); // true

// Это не палиндром
checkPalindrom('Кекс');  // false
