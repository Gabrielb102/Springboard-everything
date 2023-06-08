const { produceTimeWord, 
  produceTimeInts, 
  getHourWord, 
  getOnesPlaceMinuteWord, 
  getTeensMinuteWord,
  getMinuteWord, 
  getAmOrPm } = require('./timeWord');

describe('timeWord', () => {
  test("Works for 00:00 -> midnight", () => {
    const timeString = '00:00'
    const timeWord = 'midnight'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);
  });
  test("Works for 00:12 -> twelve twelve am", () => {
    const timeString = '00:12'
    const timeWord = 'twelve twelve am'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 01:00 -> one o'clock am", () => {
    const timeString = '01:00'
    const timeWord = "one o'clock am"
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 06:01 -> six oh one am", () => {
    const timeString = '06:01'
    const timeWord = 'six oh one am'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 06:10 -> six ten am", () => {
    const timeString = '06:10'
    const timeWord = 'six ten am'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 06:18	-> six eighteen am", () => {
    const timeString = '06:18'
    const timeWord = 'six eighteen am'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 06:30	-> six thirty am", () => {
    const timeString = '06:30'
    const timeWord = 'six thirty am'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 10:34	-> ten thirty four am", () => {
    const timeString = '10:34'
    const timeWord = 'ten thirty four am'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 12:00 -> noon", () => {
    const timeString = '12:00'
    const timeWord = 'noon'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 12:09	-> twelve oh nine pm", () => {
    const timeString = '12:09'
    const timeWord = 'twelve oh nine pm'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
  test("Works for 23:23	-> eleven twenty three pm", () => {
    const timeString = '23:23'
    const timeWord = 'eleven twenty three pm'
    const time = produceTimeWord(timeString);
    expect(time).toEqual(timeWord);

  });
});

describe('timeWord helper functions', () => {
  test("produceTimeInts", () => {
    const intsObj = produceTimeInts('11:00');
    expect(intsObj).toBeInstanceOf(Object);
    expect(intsObj.hour).toEqual(11);
    expect(intsObj.minute).toEqual(0);
  });
  test("getHourWord", () => {
    const hourWord = getHourWord(13);
    const hourWordTwo = getHourWord(0);
    expect(hourWord).toEqual('one ');
    expect(hourWordTwo).toEqual('twelve ');
  });
  test("getOnesPlaceMinutesWord", () => {
    const numString = getOnesPlaceMinuteWord('3');
    expect(numString).toEqual('three ');
  });
  test("getTeensMinuteWord", () => {
    const minWord = getTeensMinuteWord(13);
    expect(minWord).toEqual('thirteen ');
  });
  test("getMinuteWord", () => {
    const shouldBeOClock = getMinuteWord(0);
    const shouldBeOhOne = getMinuteWord(1);
    const shouldBeTwenty = getMinuteWord(20);
    const shouldBeFiftyNine = getMinuteWord(59);
    expect(shouldBeOClock).toEqual("o'clock ");
    expect(shouldBeOhOne).toEqual('oh one ');
    expect(shouldBeTwenty).toEqual('twenty ');
    expect(shouldBeFiftyNine).toEqual('fifty nine ');
  })
  test("getAmOrPm", () => {
    const timeOfDay = getAmOrPm(12);
    const timeOfDayTwo = getAmOrPm(3);
    expect(timeOfDay).toEqual('pm');
    expect(timeOfDayTwo).toEqual('am');
  });
});