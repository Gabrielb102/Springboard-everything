describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    allServers = {};
    serverId = 0;
    serverNameInput.value = "";
  });
    //SERVERS.JS

  // it('should add a new server to allServers on submitServerInfo()', function () {
  //   serverNameInput = "Alice";
  //   const event = document.createEvent("Event");
  //   event.initEvent("submit");
  //   serverForm.addEventListener('submit', submitServerInfo);
  //   serverForm.dispatchEvent(event);
  //   submitServerInfo()
  //   expect(Object.keys(allServers).length).toEqual(1);
  //   expect(allServers['server' + serverId].serverName).toEqual('Alice');
  // });

  afterEach(function() {
    allServers = {};
    serverId = 0;
    serverNameInput.value = "";
  });

});



//HELPERS.JS
describe("Helper functions tests", () => {
  beforeEach(()=> {
    allPayments = {};
    billAmtInput.value = "";
    tipAmtInput.value = "";
  })
//sumPaymentTotal
  it("should calculate sum of all types of payments", function() {
    allPayments = {
      payment1: {billAmt: '200', tipAmt: '40', tipPercent: 20},
      payment2: {billAmt: '1000', tipAmt: '50', tipPercent: 5},
      payment3: {billAmt: '5000', tipAmt: '8', tipPercent: 0}}
    expect(sumPaymentTotal('billAmt')).toEqual(6200);
    expect(sumPaymentTotal('tipAmt')).toEqual(98);
  })

  //calculateTipPercent
  it("should accurately calculate tips", function() {
    expect(calculateTipPercent(200,20)).toEqual(10);
  })

  //appendTd(tr, value) 
  it("should add a new value to a table row", function() {
    const sampleTr = document.createElement('tr');
    const tdNumberBefore = sampleTr.children.length;
    appendTd(sampleTr,"voop");
    const tdNumberAfter = sampleTr.children.length;
    expect(tdNumberBefore).toEqual(tdNumberAfter - 1);
  })

  afterEach(()=> {
    allPayments = {};
    billAmtInput.value = "";
    tipAmtInput.value = "";
  })
});

//PAYMENTS.JS
describe("Payments tests (with setup and teardown)", function() {
  beforeEach(()=> {
    allPayments = {};
    billAmtInput.value = "";
    tipAmtInput.value = "";
  })
//appendPaymentTable
  it("should append to Payment table with all payment details", function() {
    const sampleInput = {billAmt: 200, tipAmt: 20, tipPercent: 10};
    const tableRows = document.getElementsByTagName("tbody")[0].children;
    const beforeAppend = tableRows.length;
    appendPaymentTable(sampleInput);
    const afterAppend = tableRows.length;
    expect(beforeAppend).toEqual(afterAppend - 1);
    expect(tableRows[tableRows.length - 1].children[0].innerText).toEqual("$200");
    expect(tableRows[tableRows.length - 1].children[1].innerText).toEqual("$20");
    expect(tableRows[tableRows.length - 1].children[2].innerText).toEqual("10%");
  })
//createCurPayment
  it("should create an object representing current payment details", function() {
    billAmtInput.value = 200;
    tipAmtInput.value = 20;
    expect(createCurPayment()).toEqual(
      {billAmt: '200', tipAmt: '20', tipPercent: 10});
  });

  it("should not create an object when bill is 0", function(){
    billAmtInput.value = 0;
    tipAmtInput.value = 20;
    expect(createCurPayment()).toEqual();
  });

  it("should not create an object when inputs are empty", function(){
    billAmtInput.value = '';
    tipAmtInput.value = '';
    expect(createCurPayment()).toEqual();
  });
//updateSummary
  it("should accurately update payment summary section", function() {
    billAmtInput.value = 5000;
    tipAmtInput.value = 8;
    allPayments = {
      payment1: {billAmt: '200', tipAmt: '40', tipPercent: 20},
      payment2: {billAmt: '1000', tipAmt: '50', tipPercent: 5},
      payment3: {billAmt: '5000', tipAmt: '8', tipPercent: 0}}
    updateSummary();
    expect(summaryTds[0].innerHTML).toEqual("$6200");
    expect(summaryTds[1].innerHTML).toEqual("$98");
    expect(summaryTds[2].innerHTML).toEqual("8%");
  })
//submitPaymentInfo(evt)
  it("should not act without an event", function() {
    const tableRows = document.getElementsByTagName("tbody")[0].children;
    const tableRowsBefore = tableRows.length;
    const summaryTdsBefore = summaryTds[0].innerText + summaryTds[1].innerText + summaryTds[2].innerText;
    const inputBefore = billAmtInput.value + tipAmtInput.value;
    submitPaymentInfo();
    const tableRowsAfter = tableRows.length;
    const summaryTdsAfter = summaryTds[0].innerText + summaryTds[1].innerText + summaryTds[2].innerText;
    const inputAfter = billAmtInput.value + tipAmtInput.value;
    expect(tableRowsBefore).toEqual(tableRowsAfter);
    expect(summaryTdsBefore).toEqual(summaryTdsAfter);
    expect(inputBefore).toEqual(inputAfter);
  })
  afterEach(()=> {
    allPayments = {};
    billAmtInput.value = "";
    tipAmtInput.value = "";
  })
})

