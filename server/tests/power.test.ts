import { describe, expect, it } from "vitest";

function pow (base : number, power:number){
    return base ** power;
}
describe ("Тестирование функции возвеления в степень",() => {
    it('Два положительных числа ',()=> {
        expect(pow(3,3)).toBe(27);
    });
 it('Отрицательное число в положительную степень ',()=> {
        expect(pow(-3,3)).toBe(-27);
    });
it('Положительное число в отрицательную степень ',()=> {
        expect(pow(10,-2)).toBe(0.01);
    });
it('Дробное число в положительную степень ',()=> {
        expect(pow(0.01,2)).toBe(0.0001);
    });

})