import { validateCityName } from './validate/validateCity';
import { validateDate } from './validate/validateDate';
import { errors } from './utils/dictionarty';

describe('Валидация даты', () => {
    // Тест 1: Валидация даты пропускает дату в виде ДД.ММ.ГГГГ
    it('пропускает дату в виде ДД.ММ.ГГГГ', () => {
      const result = validateDate('07.07.2077');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe(errors.date.valid);
    });
  
    // Тест 2: Валидация даты не пропускает спецсимволы
    it('не пропускает спецсимволы', () => {
      const result = validateDate('12.03.202@');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(errors.date.invalidCharacters);
    });
  
    // Тест 3: Валидация даты не пропускает буквенные значения
    it('не пропускает буквенные значения', () => {
      const result = validateDate('12.March.2023');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(errors.date.invalidCharacters);
    });
  
    // Тест 4: Валидация даты выдаёт предупреждение, если дата раньше текущей
    it('не пропускает, если дата раньше текущей', () => {
      const result = validateDate('27.05.1703');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(errors.date.past);
    });
  });

  describe('Валидация города', () => {
    // Тест 1: Валидация города выдаёт предупреждение, если есть экранирование
    it('не пропускает, если есть экранирование', () => {
      const result = validateCityName('Paris<script>');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe(errors.city.escape);
    });
  
    // Тест 2: Валидация города пропускает название с восклицательным знаком или дефисами
    it('пропускает название с восклицательным знаком или дефисами', () => {
      const result = validateCityName('Saint-Louis-du-Ha! Ha!');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe(errors.city.valid);
    });
  
    // Тест 3: Валидация города пропускает название со спецсимволами
    it('пропускает название со спецсимволами', () => {
      const result = validateCityName('Ağrı');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe(errors.city.valid);
    });
  
    // Тест 4: Валидация города пропускает название из одной буквы
    it('пропускает название из одной буквы', () => {
      const result = validateCityName('A');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe(errors.city.valid);
    });
  });