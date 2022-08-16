import formatNumber from "./formatNumber";

test("should return '100'", () => {
  const number = 100;
  expect(formatNumber(number)).toBe(number.toString());
});

test("should return '1.4K'", () => {
  const number = 1356;
  expect(formatNumber(number)).toBe("1.4K");
});

test("should return '68.4K'", () => {
  const number = 68368;
  expect(formatNumber(number)).toBe("68.4K");
});

test("should return '102.7K'", () => {
  const number = 102689;
  expect(formatNumber(number)).toBe("102.7K");
});
